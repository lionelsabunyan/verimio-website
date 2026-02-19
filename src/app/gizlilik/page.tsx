import Link from "next/link";
import { ArrowUpRight, Shield } from "lucide-react";
import { BRAND } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | Verimio",
  description:
    "Verimio olarak kişisel verilerinizi nasıl topladığımızı, işlediğimizi ve koruduğumuzu açıklıyoruz. KVKK kapsamındaki haklarınızı öğrenin.",
};

const sections = [
  {
    id: "veri-sorumlusu",
    title: "1. Veri Sorumlusu",
    content: `Bu Gizlilik Politikası, Verimio danışmanlık hizmetleri ("Verimio", "biz", "bizim") tarafından hazırlanmıştır. 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında veri sorumlusu sıfatıyla hareket etmekteyiz.

İletişim için: ${BRAND.email}`,
  },
  {
    id: "toplanan-veriler",
    title: "2. Toplanan Veriler",
    content: `Şirket Check-Up formu, iletişim formu veya e-posta yoluyla bizimle paylaştığınız veriler şunlardır:

• Ad ve soyad (isteğe bağlı)
• Şirket e-posta adresi
• Telefon numarası (isteğe bağlı)
• Sektör ve şirket büyüklüğü bilgisi
• İş süreçlerinize ilişkin paylaştığınız operasyonel bilgiler

Sitemizdeki teknik izleme araçları aracılığıyla anonim kullanım verileri (sayfa görüntüleme, oturum süresi vb.) toplanabilir.`,
  },
  {
    id: "isleme-amaci",
    title: "3. Verilerin İşlenme Amaçları",
    content: `Topladığımız kişisel veriler aşağıdaki amaçlarla işlenmektedir:

• Şirket Check-Up analizi ve size özel raporun hazırlanması
• Danışmanlık teklifi ve görüşme talebinin yanıtlanması
• İletişim taleplerinizin karşılanması
• Hizmet kalitemizin iyileştirilmesi
• Yasal yükümlülüklerin yerine getirilmesi

Verileriniz, açıkça belirtilen bu amaçların dışında kullanılmaz.`,
  },
  {
    id: "hukuki-dayanak",
    title: "4. Hukuki Dayanak",
    content: `Kişisel verilerinizi aşağıdaki hukuki dayanaklara göre işliyoruz:

• Sözleşmenin kurulması veya ifası için zorunlu olması (KVKK Md. 5/2-c)
• Meşru menfaatlerimiz kapsamında işleme (KVKK Md. 5/2-f)
• Açık rızanız (pazarlama iletişimleri için, ayrıca onay alınarak)

Yasal dayanaksız hiçbir veri işleme faaliyeti yürütülmemektedir.`,
  },
  {
    id: "ucuncu-taraf",
    title: "5. Üçüncü Taraflarla Paylaşım",
    content: `Kişisel verileriniz hiçbir koşulda ticari amaçla üçüncü taraflarla paylaşılmaz, satılmaz veya kiralanmaz.

Verileriniz yalnızca şu durumlarda üçüncü taraflarla paylaşılabilir:

• Hizmetin sunulması için teknik altyapı sağlayıcıları (örn. e-posta platformu, veritabanı hizmeti) — yalnızca hizmeti sunmak için gereken minimum erişimle
• Yasal yükümlülük veya mahkeme kararı gerektirdiğinde yetkili kamu kurumları

Çalıştığımız tüm teknik hizmet sağlayıcıları, veri işleme sözleşmesi kapsamında KVKK uyumluluğu taahhüt etmektedir.`,
  },
  {
    id: "veri-guvenligi",
    title: "6. Veri Güvenliği",
    content: `Verilerinizi korumak için endüstri standardı güvenlik önlemleri uygulanmaktadır:

• Veriler şifreli iletişim (HTTPS/TLS) ile aktarılır
• Depolanan veriler şifrelenerek saklanır
• Sisteme erişim yetki bazlı ve sınırlıdır
• Düzenli güvenlik değerlendirmeleri yapılmaktadır

Talep etmeniz halinde analiz başlamadan önce Gizlilik Sözleşmesi (NDA) imzalayabiliriz.`,
  },
  {
    id: "saklama-suresi",
    title: "7. Veri Saklama Süresi",
    content: `Kişisel verileriniz, hizmetin sunulması için gerekli olan süre boyunca saklanır. Aktif bir danışmanlık ilişkisi sona erdikten sonra verileriniz:

• Yasal zorunluluk bulunmayan hallerde en geç 2 yıl içinde silinir veya anonimleştirilir
• Yasal yükümlülük kapsamındaki veriler ilgili mevzuatta öngörülen süreler boyunca saklanır

Hesap silme veya veri silme talebinizi ${BRAND.email} adresine iletebilirsiniz.`,
  },
  {
    id: "haklariniz",
    title: "8. KVKK Kapsamındaki Haklarınız",
    content: `6698 sayılı KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:

• Kişisel verilerinizin işlenip işlenmediğini öğrenme
• İşlenmişse buna ilişkin bilgi talep etme
• İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme
• Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri öğrenme
• Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme
• Kişisel verilerinizin silinmesini veya yok edilmesini isteme
• İşlemenin otomatik sistemler aracılığıyla yapılması durumunda ortaya çıkabilecek aleyhte sonuçlara itiraz etme
• Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme

Taleplerinizi ${BRAND.email} adresine yazılı olarak iletebilirsiniz.`,
  },
  {
    id: "cerezler",
    title: "9. Çerezler (Cookies)",
    content: `Sitemiz, temel işlevsellik ve anonim analitik amaçlarla sınırlı sayıda çerez kullanabilir. Kişisel veri içeren çerezler yalnızca açık onayınızla kullanılır.

Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz. Bu durumda bazı site özellikleri kısıtlı çalışabilir.`,
  },
  {
    id: "degisiklikler",
    title: "10. Politika Değişiklikleri",
    content: `Bu Gizlilik Politikası zaman zaman güncellenebilir. Önemli değişiklikler söz konusu olduğunda ilgili taraflar e-posta ile bilgilendirilecektir. Politikanın güncel versiyonu her zaman bu sayfada yayınlanır.

Son güncelleme: Şubat 2026`,
  },
];

export default function GizlilikPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            <span className="w-1.5 h-1.5 rounded-full bg-secondary/60" />
            <span className="text-xs font-semibold text-foreground-secondary tracking-widest uppercase ml-1">
              Yasal
            </span>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary-light/10 flex items-center justify-center shrink-0 mt-1">
              <Shield className="w-6 h-6 text-primary-light" />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
                Gizlilik{" "}
                <span className="gradient-text">Politikası</span>
              </h1>
              <p className="text-lg text-foreground-secondary leading-relaxed max-w-2xl">
                Verileriniz bizim için emanettir. Bu politika, hangi verileri
                topladığımızı, neden topladığımızı ve nasıl koruduğumuzu
                açıklamaktadır.
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-sm text-foreground-secondary">
            Son güncelleme: Şubat 2026
          </div>
        </div>
      </section>

      {/* İçindekiler */}
      <section className="pb-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 rounded-2xl border border-border bg-surface">
            <h2 className="text-sm font-semibold text-foreground-secondary uppercase tracking-wide mb-4">
              İçindekiler
            </h2>
            <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-sm text-primary-light hover:text-primary dark:hover:text-secondary transition-colors hover:underline underline-offset-2"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* İçerik */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {sections.map((section) => (
              <div
                key={section.id}
                id={section.id}
                className="scroll-mt-28"
              >
                <h2 className="text-xl font-bold mb-4 pb-3 border-b border-border">
                  {section.title}
                </h2>
                <div className="text-foreground-secondary leading-relaxed whitespace-pre-line text-sm sm:text-base">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* İletişim CTA */}
      <section className="section-padding bg-background-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8 rounded-2xl border border-border bg-surface">
            <div>
              <h2 className="text-xl font-bold mb-2">Sorularınız mı var?</h2>
              <p className="text-foreground-secondary text-sm leading-relaxed">
                Gizlilik haklarınız veya veri işleme süreçlerimiz hakkında
                doğrudan bizimle iletişime geçin.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href={`mailto:${BRAND.email}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground font-medium rounded-full hover:border-border-hover transition-all duration-200 text-sm"
              >
                E-posta Gönderin
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary text-primary font-semibold rounded-full hover:bg-secondary-hover transition-all duration-200 text-sm"
              >
                İletişime Geçin
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
