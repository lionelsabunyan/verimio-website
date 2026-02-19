import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import { BRAND } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kullanım Şartları | Verimio",
  description:
    "Verimio hizmetlerini kullanım koşulları, tarafların hak ve yükümlülükleri ile fikri mülkiyet hakkında bilgi edinin.",
};

const sections = [
  {
    id: "taraflar",
    title: "1. Taraflar ve Kapsam",
    content: `Bu Kullanım Şartları ("Şartlar"), Verimio danışmanlık hizmetleri ("Verimio", "biz") ile sitemizi ziyaret eden veya hizmetlerimizden yararlanan kişi ya da kuruluşlar ("Kullanıcı", "siz") arasındaki ilişkiyi düzenlemektedir.

Sitemizi ziyaret etmek, Şirket Check-Up formunu doldurmak veya danışmanlık hizmetlerimizden yararlanmak, bu Şartları kabul ettiğiniz anlamına gelir. Şartları kabul etmiyorsanız lütfen hizmetlerimizi kullanmayın.`,
  },
  {
    id: "hizmet-tanimi",
    title: "2. Hizmetin Tanımı",
    content: `Verimio, şirketlerin iş süreçlerini analiz eden ve kurumsal AI dönüşümünde rehberlik eden bir danışmanlık firmasıdır. Sunduğumuz hizmetler şunlardır:

• Şirket Check-Up analizi ve raporlama
• Süreç analizi ve optimizasyon danışmanlığı
• İş akışı otomasyonu danışmanlığı
• Müşteri deneyimi otomasyonu
• Veri ve raporlama otomasyonu
• AI strateji ve entegrasyon danışmanlığı

Şirket Check-Up hizmeti ücretsizdir. Uygulama danışmanlığı hizmetleri ayrı bir sözleşme kapsamında ücretlendirilir.`,
  },
  {
    id: "kullanici-yukumlulukleri",
    title: "3. Kullanıcı Yükümlülükleri",
    content: `Hizmetlerimizi kullanırken aşağıdaki kurallara uymayı kabul edersiniz:

• Doğru ve güncel bilgi sağlamak. Yanıltıcı veya hatalı bilgi vermekten kaçınmak.
• Siteyi yalnızca yasal amaçlarla kullanmak.
• Sistemin güvenliğini tehlikeye atacak girişimlerde bulunmamak (SQL enjeksiyonu, XSS, bot trafiği vb.).
• Sitemizin içeriğini izinsiz kopyalamamak, dağıtmamak veya ticari amaçla kullanmamak.
• Diğer kullanıcıların veya Verimio'nun hizmetlerinden yararlanmasını engelleyecek davranışlarda bulunmamak.

Bu kurallara aykırı davranan kullanıcıların hizmetlere erişimi derhal sonlandırılabilir.`,
  },
  {
    id: "fikri-mulkiyet",
    title: "4. Fikri Mülkiyet",
    content: `Sitemizdeki tüm içerik — metinler, görseller, logolar, yazılım kodu, tasarım öğeleri ve raporlar — Verimio'nun mülkiyetinde olup ilgili fikri mülkiyet yasalarıyla korunmaktadır.

Size özel hazırlanan Check-Up raporu, analiz sonuçları ve yol haritası belgesi yalnızca kişisel veya kurumsal kullanımınız için teslim edilmektedir. Bu belgelerin ticari amaçla yeniden satışı, dağıtımı veya başka kuruluşlara aktarımı yasaktır.

Verimio markası, logosu ve ticari adı izinsiz kullanılamaz.`,
  },
  {
    id: "gizlilik",
    title: "5. Gizlilik",
    content: `Kişisel verilerinizin işlenmesi ve korunması hakkında detaylı bilgi için Gizlilik Politikamızı inceleyin.

Danışmanlık sürecinde paylaştığınız operasyonel bilgiler gizli tutulur. Talep etmeniz halinde proje başlamadan önce Gizlilik Sözleşmesi (NDA) imzalanabilir.`,
  },
  {
    id: "sorumluluk-sinirlari",
    title: "6. Sorumluluk Sınırları",
    content: `Verimio, sunduğu analiz raporları ve danışmanlık önerilerinde mümkün olan en yüksek doğruluk ve kaliteyi hedefler. Bununla birlikte:

• Raporlar ve öneriler bilgi amaçlıdır; belirli finansal, hukuki veya teknik sonuçları garanti etmez.
• Danışmanlık önerilerinin hayata geçirilmesinden kaynaklanabilecek zararlardan, öneriyi uygulayan tarafın sorumluluğu saklı olmak kaydıyla Verimio sorumlu tutulamaz.
• Sitemizin teknik altyapısında oluşabilecek kesintiler, veri kayıpları veya güvenlik açıklarından doğan zararlar için, kasıt veya ağır ihmal bulunmadıkça Verimio'nun sorumluluğu sınırlıdır.
• Üçüncü taraf sitelere verilen bağlantıların içeriğinden Verimio sorumlu değildir.`,
  },
  {
    id: "ucretlendirme",
    title: "7. Ücretlendirme ve Ödeme",
    content: `Şirket Check-Up analizi ve raporu tamamen ücretsizdir. Herhangi bir ödeme bilgisi talep edilmez.

Uygulama danışmanlığı hizmetleri için:
• Teklif, check-up raporunun ardından projenin kapsamına göre ayrıca sunulur.
• Hizmet başlamadan önce yazılı bir sözleşme imzalanır.
• Ödeme koşulları her proje için ayrıca belirlenir.

Sürpriz maliyet veya önceden belirtilmemiş ücret talep edilmez.`,
  },
  {
    id: "fesih",
    title: "8. Hizmet Feshi",
    content: `Her iki taraf da önceden yazılı bildirimde bulunarak danışmanlık ilişkisini sonlandırabilir.

Verimio, aşağıdaki durumlarda herhangi bir tazminat yükümlülüğü olmaksızın hizmeti sona erdirebilir:
• Kullanıcının bu Şartları ihlal etmesi
• Hizmetin kötüye kullanılması
• Hizmetin sürdürülmesinin yasal ya da teknik olarak imkânsız hale gelmesi

Fesih halinde tamamlanan çalışmalar için gerçekleşen ücretler tahsil edilir; henüz başlamamış bölümler ücretlendirilmez.`,
  },
  {
    id: "uyusmazlik",
    title: "9. Uyuşmazlık Çözümü",
    content: `Bu Şartlar Türk hukukuna tabidir.

Taraflar arasında doğabilecek uyuşmazlıklar öncelikle müzakere yoluyla çözülmeye çalışılır. Anlaşma sağlanamaması durumunda Türkiye Cumhuriyeti mahkemeleri yetkilidir.`,
  },
  {
    id: "degisiklikler",
    title: "10. Şartlarda Değişiklik",
    content: `Verimio, bu Kullanım Şartlarını önceden haber vermeksizin güncelleme hakkını saklı tutar. Önemli değişiklikler söz konusu olduğunda aktif kullanıcılar e-posta ile bilgilendirilecektir.

Şartların güncel versiyonu her zaman bu sayfada yayınlanır. Hizmetleri kullanmaya devam etmeniz, güncellenmiş Şartları kabul ettiğiniz anlamına gelir.

Son güncelleme: Şubat 2026`,
  },
];

export default function KullanimSartlariPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            <span className="w-1.5 h-1.5 rounded-full bg-secondary/60" />
            <span className="text-sm font-medium text-foreground-secondary tracking-wide uppercase ml-1">
              Yasal
            </span>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary-light/10 flex items-center justify-center shrink-0 mt-1">
              <FileText className="w-6 h-6 text-primary-light" />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
                Kullanım{" "}
                <span className="gradient-text">Şartları</span>
              </h1>
              <p className="text-lg text-foreground-secondary leading-relaxed max-w-2xl">
                Verimio hizmetlerini kullanırken geçerli olan koşulları,
                tarafların hak ve yükümlülüklerini bu sayfada bulabilirsiniz.
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
              <h2 className="text-xl font-bold mb-2">Soru veya öneriniz mi var?</h2>
              <p className="text-foreground-secondary text-sm leading-relaxed">
                Kullanım şartları veya danışmanlık hizmetlerimiz hakkında
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
