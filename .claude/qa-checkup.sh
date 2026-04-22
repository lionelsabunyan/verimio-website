#!/usr/bin/env bash
# QA: Check-up form uçtan uca test
# Çalıştır: bash .claude/qa-checkup.sh
# Gerekli: .env.local (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)

set -euo pipefail

SITE="https://www.verimio.com.tr"
TEST_EMAIL="weekly-qa-bot@verimio.com.tr"
PASS=0
FAIL=0

# .env.local'dan değerleri oku
ENV_FILE="$(dirname "$0")/../.env.local"
if [[ -f "$ENV_FILE" ]]; then
  export $(grep -E '^(NEXT_PUBLIC_SUPABASE_URL|NEXT_PUBLIC_SUPABASE_ANON_KEY)=' "$ENV_FILE" | xargs)
fi

ok()   { echo "  ✓ $1"; ((PASS++)); }
fail() { echo "  ✗ $1"; ((FAIL++)); }
step() { echo; echo "── $1"; }

# ─── 1. API Submit ────────────────────────────────────────────────────────────
step "1/4 · API Submit"

RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$SITE/api/checkup/submit" \
  -H "Content-Type: application/json" \
  -H "Origin: $SITE" \
  -H "Referer: $SITE/analiz" \
  -d '{
    "email":         "'"$TEST_EMAIL"'",
    "company_name":  "QA Bot Haftalık Test",
    "sector":        "Teknoloji / Yazılım",
    "team_size":     "2-5 kişi",
    "tools":         ["Excel / Google Sheets", "CRM (Salesforce, HubSpot vb.)"],
    "pain_points":   {"s6": "Raporlama yavaş", "s7": "Müşteri takibi zor", "s8": "Veri dağınık"},
    "biggest_pain":  "Bu otomatik haftalık QA testidir — lütfen göz ardı edin.",
    "priority_area": "Veri & Raporlama Otomasyonu",
    "expectation":   "Rapor yeterli",
    "timeline":      "Araştırma aşamasındayım",
    "phone":         "05001112233"
  }')

HTTP_CODE=$(echo "$RESPONSE" | tail -1)
BODY=$(echo "$RESPONSE" | head -n -1)

[[ "$HTTP_CODE" == "200" ]] && ok "HTTP 200 OK" || fail "HTTP $HTTP_CODE (200 beklendi)"

if echo "$BODY" | python3 -c "import sys,json; d=json.load(sys.stdin); assert d.get('success')==True" 2>/dev/null; then
  ok "success: true"
else
  fail "success: true değil — body: $BODY"
fi

LEAD_ID=$(echo "$BODY" | python3 -c "import sys,json; print(json.load(sys.stdin).get('leadId',''))" 2>/dev/null || echo "")
[[ -n "$LEAD_ID" ]] && ok "leadId alındı: $LEAD_ID" || fail "leadId yok"

# Analiz alanlarını doğrula
for field in score score_label top_opportunity estimated_saving summary recommendations roadmap; do
  if echo "$BODY" | python3 -c "import sys,json; d=json.load(sys.stdin); assert '$field' in d.get('analysis',{})" 2>/dev/null; then
    ok "analysis.$field mevcut"
  else
    fail "analysis.$field eksik"
  fi
done

SCORE=$(echo "$BODY" | python3 -c "import sys,json; print(json.load(sys.stdin)['analysis']['score'])" 2>/dev/null || echo "")
if [[ -n "$SCORE" ]] && python3 -c "assert 1 <= $SCORE <= 10" 2>/dev/null; then
  ok "score aralığı geçerli ($SCORE/10)"
else
  fail "score aralık dışı veya eksik: $SCORE"
fi

REC_COUNT=$(echo "$BODY" | python3 -c "import sys,json; print(len(json.load(sys.stdin)['analysis']['recommendations']))" 2>/dev/null || echo "0")
if python3 -c "assert 3 <= $REC_COUNT <= 5" 2>/dev/null; then
  ok "recommendations sayısı geçerli ($REC_COUNT adet)"
else
  fail "recommendations sayısı hatalı ($REC_COUNT — 3-5 beklendi)"
fi

# ─── 2. Supabase Doğrulama ────────────────────────────────────────────────────
step "2/4 · Supabase doğrulama"

if [[ -z "${NEXT_PUBLIC_SUPABASE_URL:-}" || -z "${NEXT_PUBLIC_SUPABASE_ANON_KEY:-}" ]]; then
  fail "Supabase env değişkenleri bulunamadı (.env.local eksik?)"
else
  SB_RESP=$(curl -s "$NEXT_PUBLIC_SUPABASE_URL/rest/v1/leads?email=eq.$TEST_EMAIL&select=id,email,analysis_json&limit=1" \
    -H "apikey: $NEXT_PUBLIC_SUPABASE_ANON_KEY" \
    -H "Authorization: Bearer $NEXT_PUBLIC_SUPABASE_ANON_KEY")

  SB_COUNT=$(echo "$SB_RESP" | python3 -c "import sys,json; print(len(json.load(sys.stdin)))" 2>/dev/null || echo "0")
  [[ "$SB_COUNT" -ge 1 ]] && ok "Lead Supabase'de bulundu" || fail "Lead Supabase'de bulunamadı — $SB_RESP"

  HAS_ANALYSIS=$(echo "$SB_RESP" | python3 -c "import sys,json; rows=json.load(sys.stdin); print('yes' if rows and rows[0].get('analysis_json') else 'no')" 2>/dev/null || echo "no")
  [[ "$HAS_ANALYSIS" == "yes" ]] && ok "analysis_json Supabase'e yazılmış" || fail "analysis_json Supabase'de null"
fi

# ─── 3. E-posta (manuel kontrol notu) ────────────────────────────────────────
step "3/4 · E-posta (manuel)"
echo "  → $TEST_EMAIL adresine rapor emaili gönderilmeli"
echo "  → info@verimio.com.tr adresine bildirim emaili gönderilmeli"
echo "  ℹ  Bu adımı otomatik doğrulayamıyoruz — inbox'ı kontrol et."

# ─── 4. Cleanup ───────────────────────────────────────────────────────────────
step "4/4 · Cleanup"

if [[ -n "${NEXT_PUBLIC_SUPABASE_URL:-}" && -n "${NEXT_PUBLIC_SUPABASE_ANON_KEY:-}" && -n "$LEAD_ID" ]]; then
  DEL_RESP=$(curl -s -o /dev/null -w "%{http_code}" -X DELETE \
    "$NEXT_PUBLIC_SUPABASE_URL/rest/v1/leads?id=eq.$LEAD_ID" \
    -H "apikey: $NEXT_PUBLIC_SUPABASE_ANON_KEY" \
    -H "Authorization: Bearer $NEXT_PUBLIC_SUPABASE_ANON_KEY" \
    -H "Prefer: return=minimal")
  [[ "$DEL_RESP" == "204" ]] && ok "Test lead silindi (id: $LEAD_ID)" || fail "Silme başarısız (HTTP $DEL_RESP) — manual sil: id=$LEAD_ID"
else
  echo "  ⚠  Lead ID veya Supabase creds eksik — manual silme gerekebilir (email: $TEST_EMAIL)"
fi

# ─── Özet ─────────────────────────────────────────────────────────────────────
echo
echo "══════════════════════════════════════"
echo "  QA Sonuç: $PASS geçti / $FAIL başarısız"
[[ $FAIL -eq 0 ]] && echo "  DURUM: ✓ TÜM TESTLER GEÇTİ" || echo "  DURUM: ✗ BAZI TESTLER BAŞARISIZ"
echo "══════════════════════════════════════"
echo

exit $FAIL
