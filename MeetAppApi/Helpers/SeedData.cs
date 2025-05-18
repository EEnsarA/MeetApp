using MeetAppApi.Models;
namespace MeetAppApi.Helpers
{
    public static class SeedData
    {


        public static List<User> CreateUser()
        {

            var userData = new (int id, string firstName, string lastName, string userName, string email, string rawPassword, string location, Role role, DateTime createdTime)[]
            {
                (1,"Ensar","Atıcı","ensaratc_","ensar.atc@gmail.com","ensar123","Erzincan/TR",Role.Admin,DateTime.Now),
                (2,"John","Doe","john_doe","john@hotmail.com","john123","Washington/US",Role.User,DateTime.Now),
                (3,"Ahmet","Yıldız","Yıldız_1903","yıldız@gmail.com","yıldız123","Ankara/TR",Role.User,DateTime.Now),
            };



            var users = userData.Select(u => new User
            {
                Id = u.id,
                FirstName = u.firstName,
                LastName = u.lastName,
                UserName = u.userName,
                Email = u.email,
                HashedPassword = PasswordHasher.HashPassword(u.rawPassword),
                Location = u.location,
                Role = u.role,
                CreatedTime = u.createdTime,
            }).ToList();

            return users;
        }

        public static List<Category> CreateCategory()
        {
            var categoryData = new (int id, string categoryName)[]
            {
                (1,"Sahne"),
                (2,"Müzik"),
                (3,"Aile"),
                (4,"Spor"),
                (5,"Eğitim"),
                (6,"İş"),
                (7,"Çevrimiçi"),
                (8,"Tiyatro"),
                (9,"Dans"),
                (10,"Stand-Up"),
                (11,"Sirk"),
                (12,"Açıkhava"),
                (13,"Festival"),
                (14,"Müze & Sergi"),
                (15,"Komedi"),
                (16,"Sosyal Etkinlikler"),
                (17,"Gösteri"),
                (18,"Dram"),
            };


            var categories = categoryData.Select(c => new Category
            {  
               Id = c.id,
               CategoryName = c.categoryName,

            }).ToList();

            return categories;

        }

        public static List<Event> createEvent()
        {
            var eventData = new (int id, string eventName, string eventDescription, string imageUrl, string city, string country, string location, DateTime startDate, DateTime endDate, int numberOfTickets, double ticketPrice, bool isOnSale, bool isOnBanner, string rules)[]
            {
                (
                1,
                "Legends Of İstanbul",
                @"İstanbul’un Efsaneleriyle Zaman Yolculuğuna Davetlisiniz!
                Tarihin derinliklerine, efsanelerle yoğrulmuş İstanbul’un büyüleyici atmosferine adım atın! 'Legends of Istanbul' canlı oyunculu gösterisi, dijital görseller, etkileyici sahne efektleri ve destansı bir hikâye ile İstanbul’un kadim ruhunu keşfetmeye davet ediyor.
                15 farklı kostümle sahneye çıkan yetenekli oyuncularımız, Medusa’nın Laneti’nden Hürrem Sultan’ın Işıltılı Dansı’na, Galata’dan Ayasofya’ya uzanan unutulmaz bir yolculuğa sizi çıkaracak. Her bir karakter, özel kostümleriyle hayat bulacak ve İstanbul’un büyüsünü sahnede yaşatacak.
                Neler Bekliyor?
                - Medusa’nın Laneti: Yunan mitolojisinin korkutucu güzelliği Medusa'nın intikam dolu hikâyesi.
                - Yılanlardan Kaçış: Kız Kulesi'nin efsanevi hikâyesine tanıklık edin.
                - Gökyüzüne Yolculuk: Hezarfen Ahmet Çelebi'nin Galata'dan Üsküdar'a uçuşunun zaferi.
                - Ayasofya’nın Kuruluşu ve Fethi: Ayasofya’nın ihtişamlı geçmişi, Bizans İmparatoru I.Justinianus’un rüyasında gördüğü ilhamla başlayan inşaat süreci, Doğu Roma İmparatorluğu'nun kalbinde yükselen bu başyapıtın Osmanlı İmparatorluğu tarafından fethedilmesiyle taşınan manevi değerleri…
                - Fetih Kale Kuşatması: İstanbul’un fethine dair unutulmaz bir askeri zafer.
                - Hürrem Sultan’ın Işıltılı Dansı: Topkapı Sarayı’nda Hürrem Sultan’ın güç ve aşk dolu hikâyesi.
                -Mimar Sinan’ın Mirası: Osmanlı’nın büyük mimarının Süleymaniye Camisi’ni inşa etme mücadelesi.
                -Semazenlerin Gösterisi: Mevlana’nın öğretileri ışığında evrensel barış ve huzurun sembolü semazenler",
                "/uploads/legends_of_istanbul.jpg",
                "İstanbul",
                "Türkiye",
                "Alemdar Cad. No:5 Sultanahmet Fatih İstanbul (Yerebatan Sarnıcı yanı) FATİH/İstanbul",
                new DateTime(2025,5,18,16,00,0),
                new DateTime(2025,5,31,16,00,0),
                14000,
                1250.00,
                true,
                true,
                @"- Gösteri başlamadan 15 dakika önce salona gelin. Gösteri başladıktan sonra geç gelen izleyiciler alınmayacaktır.
                - Gösteri sırasında telefonları sessize alın veya kapatın. Işıklar veya sesler, hem oyuncuları hem de diğer izleyicileri rahatsız edebilir.
                - Gösteri sırasında fotoğraf veya video çekimi yapmak yasaktır. Etkinlik sonrası fotoğraf alanlarında fotoğraf çekebilirsiniz.
                - Gösteri boyunca dikkatlice izleyin ve sessiz olun. Anlatıcı ve oyuncuların performansını bölmemek için odaklanın.
                - Gösteri sırasında salon içinde yiyecek ve içecek tüketimi yasaktır. 
                - Acil bir durumda güvenlik görevlilerinin talimatlarına uyun. Çıkış yollarını önceden öğrenin.
                - Gösteri, 12 yaş ve üzeri izleyiciler için uygundur. Yüksek ses ve ışık olduğundan küçük çocuklar için etkinlik uygun olmayabilir.
                - Saygılı ve olumlu bir tutum sergileyin. Rahatsız edici davranışlar gösteren izleyiciler salondan çıkarılabilir. Etkinlik sahibi ve güvenlik görevlileri izleyiciyi oyundan çıkarma hakkına sahiptir.
                - Etkinliğe katılım için geçerli biletinizi temin edin. Online veya gişeden bilet alabilirsiniz.
                - Engelli izleyiciler için özel erişim ve yerler bulunmaktadır. Detaylı bilgi için etkinlik öncesi bizimle iletişime geçebilirsiniz. Arka otopark tarafında engelli girişi ve wc bulunmaktadır."
                ),
                (
                2,
                "What A Fest 2025",
                @"Güzel haberler ansızın gelir!
                Deniz, kum, güneş, konserler, workshoplar, oyunlar, dans, kamp ve spor... Her şeyiyle gerçek bir festival deneyimi What A Fest’te!
                10’dan fazla müzik türünü bir araya getirerek katılımcılara benzersiz bir festival sunan What A Fest, 20-24 Ağustos tarihlerinde İzmir Foça’da gerçekleşiyor!
                Rock müzikten alternatif popa, synth-pop’tan elektronik müziğe kadar kendi alanında özgün 30 grup ve müzisyen festivalde sahne alacak.
                Müziğin her türüne ev sahipliği yapan bu festivale sen de katıl, unutulmaz anlar biriktir!",
                "/uploads/what_a_fest.jpg",
                "İzmir",
                "Türkiye",
                "Foça FOÇA/İzmir",
                new DateTime(2025,8,20,12,00,0),
                new DateTime(2025,8,20,12,00,0),
                5000,
                1500.00,
                true,
                true,
                @"- Festival alanına 18 yaş altında katılımcılar ebeveynleri ile birlikte olsa dahi giriş yapamayacaklardır. (Kimliksiz içeri alım yapılmayacaktır.)
                - Dışarıdan getirilen hiçbir yiyecek ve içecek festival alanına alınmayacaktır.
                - 1+1 ve çift kişilik kamp + kombine bilet alan katılımcılar ayrı çadırlar ile alana giriş yapamayacaktır. 1+1 ve çift kişilik kamp + kombine bilet alan katılımcılar tek çadırda konaklama yapabileceklerdir.
                - Festival bileti alanlar, organizatör ve güvenlik ekibinin belirleyeceği üst ve çanta aranması dâhil her türlü güvenlik önlemini kabul 
                etmiş sayılır. Bu önlemlere uymak istemeyen katılımcıların, alana giriş haklarının iptal edileceği gibi, bilet iadeleri de yapılmayacaktır. Bütün katılımcılar kimliklerini yanında bulundurmalıdır. Katılımcıların yaşını doğrulamak amacıyla organizatör, kimlik ibrazı isteyecektir.
                - Festival biletleriyle alana gelen ya da alandaki bilet satış noktasından bilet satın alan katılımcılara aldıkları biletin sınıfına göre bileklik takılır. Bu bileklik katılımcının festival alanına giriş çıkışını sağlamaktadır. Koparılan ve çıkarılan bileklikler tekrar takılamamakta ve bileklik olmadan alana giriş yapılamamaktadır. 3. şahıslardan alınan biletlerin geçerliliği ile ilgili organizatör sorumluluk kabul etmemektedir.
                - Sadece kamp + kombine bilet sahipleri kamp alanında kullanmak üzere kamp sandalyesi getirebilir. Konser alanına kamp sandalyesi alınmayacaktır.
                - After performanslarının sona ermesinin ardından kombine ve günlük bilet sahipleri alandan ayrılması gerekir. 
                - Kamp alanına yalnızca kamp+kombine biletli misafirler giriş yapabilir.
                - Çadırınızın en uzun kenarı 300 cm olmalıdır.
                - Paketi açılmamış bandrollü tütün mamülleri içeri alınmaktadır.
                - Farklı diyet perhizi yapan misafirlerimize, alana dışarıdan yiyecek ve içecek alınmadığı için kamp alanını kullanmaları önerilmemektedir.
                - İndirimli biletler sınırlı sayıdadır.
                - Biletiniz mail ve sms olarak size gelecektir. Rezervasyona gerek yoktur.
                - Festival alanına ses ve görüntü kaydı yapan cihazlar (telefon harici), yiyecek-içecek, cam ve plastik şişe, teneke, kamp ocağı, havai fişek, yanıcı-parlayıcı her türlü nesne (aerosol madde), silah veya keskin nesneler alınmamaktadır."
                ),                            
                (
                3,
                "Ankara Çocuk Sirki",
                @"Ankara Çocuk Sirki çocuklara yönelik sirk gösterimidir, orijinal sirk figürleri ile eğlenceye her an kapılıp heyecanla izlemeye devam edeceğiniz, zaman zaman şaşkınlık ile süsleyeceğiniz duygu karmaşası ile hayran kalacağınız bir etkinliktir. 
                Sirk içerisinde;
                SİHİRBAZ SHOW 
                TAHTA BACAK
                JONGLÖR SHOW 
                BUBBLE SHOW 
                PALYAÇO SHOW, gibi birçok eğlenceli aktiviteler bulunmaktadır. 
                Sizler de yerinizi ayırmayı ve ANKARA ÇOCUK SİRKİ için unutulmaz sahne gösterilerinde hatıralar biriktirmeyi unutmayın. 
                2-12 Yaş arası için uygundur. 
                Süre: 45 Dk.",
                "/uploads/cocuk_sirki.png",
                "Samsun",
                "Türkiye",
                "Adnan Menderes Bulvarı. Deniz Evleri Mahallesi. (Yeşilyurt AVM Yanı) ATAKUM/Samsun",
                new DateTime(2025,5,31,15,00,0),
                new DateTime(2025,5,31,18,00,0),
                3000,
                800.00,
                true,
                true,
                @"- 2-12 Yaş arası için uygundur. 
                Süre: 45 Dk.
                - Organizasyon firması, diğer misafirleri rahatsız eden/edecek nitelikte, uygun görmediği kişileri etkinlik için bilet bedelini iade etmek koşuluyla, etkinlik mekanına kişiyi almama hakkına sahiptir
                - Misafirlerin belirtilen oturma düzenine uyması zorunludur. Etkinlik boyunca belirlenen koltuklarda oturulması gerekmektedir.
                - Etkinlik başlangıç saatinden en az 30 dk. önce biletle birlikte etkinliğin kapısında olacak şekilde hazır olunmasını önemle rica ederiz.
                - Giriş esnasında barkod / bilet kontrolü yapılacağı için biletinizi ibraz etmeniz zorunludur. Öncelikle biletiniz üyelik ile alınmış ise üyelik girişi yapılıp biletlerim alanından biletinize ulaşabilirsiniz. Ulaşamadığınız durumlarda, üyelik ile biletiniz almadıysanız Biletix Müşteri hizmetlerine başvurunuz.
                - Organizatör, indirimli bilet satın alma koşullarında değişiklik yapma hakkını saklı tutar.
                - Organizatör, etkinlik alanı ve saatinde değişiklik yapma hakkına sahiptir.
                - Etkinlik alanına yiyecek ve içecek almak yasaktır.
                - Etkinlik başladıktan sonra salona seyirci alınmayacaktır.
                - Satın alınan biletlerde iptal, iade ve değişiklik yapılmamaktadır.
                - Etkinlik mekanına kamera ve fotoğraf makinası sokmak yasaktır."
                ),
                (
                4,
                "Fındıkkıran - Nutcracker On Ice",
                @"Fındıkkıran - Nutcracker on Ice
                7’den 77’ye Fındıkkıran ile Buzun Üzerinde Masalsı Yolculuk
                Dünyanın en önemli gösterilerinden Fındıkkıran - Nutcracker on Ice 7’den 70’de herkesi büyülemek için 1 Kasım  – 14 Kasım 2025 tarihleri arasında, Moneytolia ana sponsorluğunda Buz Adası’nda sahnelenecek! Bu eşsiz buz gösterileri, dünyanın en prestijli dans topluluklarından biri kabul edilen Imperial Ice Stars tarafından gerçekleştirilecek.
                Nutcracker on Ice, dünyaca ünlü Imperial Ice Stars topluluğunun en büyüleyici prodüksiyonlarından biri olarak, her yaştan izleyiciyi buzun üzerinde masalsı bir yolculuğa çıkarırken Tchaikovsky’nin ölümsüz müziği ve Tony Mercer’in yaratıcı yönetimiyle unutulmaz bir deneyim sunacak.
                Zarif buz pateni figürleri, göz kamaştırıcı kostümler ve etkileyici sahne tasarımlarıyla Nutcracker on Ice, izleyiciyi klasik masalın büyülü dünyasında bir yolculuğa çıkaracak. Orijinal hikayede olduğu gibi Clara ve ona yardımcı olan Şeker Parmaklıkları ile birlikte, izleyiciler fantastik bir geceye tanıklık edecek. Görkemli koreografi, muazzam buz pateni becerileri ve büyülü özel efektlerle bu gösteri, tiyatro ve buz pateninin mükemmel birleşimini sunuyor.",
                "/uploads/fındıkkıran_on_ice.jpg",
                "İstanbul",
                "Türkiye",
                "Veliefendi, Prof. Dr. Turan Güneş Cd. 67a, 34025 ZEYTİNBURNU/İstanbul",
                new DateTime(2025,11,1,13,30,0),
                new DateTime(2025,11,1,20,00,0),
                3500,
                1000.00,
                true,
                true,
                @"- Tüm katılımcılar bilete tabiidir.
                - 15 yaş altı misafirler ebeveynleri refakatinden etkinliğe katılabilirler.
                - Dışarıdan yiyecek ve içecek getirmemenizi önemle rica ederiz.
                - Organizatör firma bilet fiyatları ve programda değişiklik yapma hakkına sahiptir.
                - Etkinlik alanına kamera ve fotoğraf makinası sokmak yasaktır.
                - Organizatör firma etkinlik için uygun görmediği kişileri bilet bedelini iade etmek koşuluyla etkinlik mekanına almama hakkına sahiptir."
                ),
                (
                5,
                "Saatleri Ayarlama Enstitüsü",
                @"Doğu ve Batı, eski ve yeni, geleneksel ve modern kutupları arasında salınıp duran Ahmet Hamdi Tanpınar’ın ölümsüz eseri Saatleri Ayarlama Enstitüsü, Serkan Keskin’in onlarca surete büründüğü bir oyunculuk şöleniyle sinema ve tiyatronun iç içe geçtiği çağdaş bir uyarlama olarak izleyici ile buluşuyor. Serdar Biliş’in yönetmenliğinde sahneye uyarlanan oyunun müziklerini Tuluğ Tırpan besteliyor.
                Yazan: Ahmet Hamdi Tanpınar
                Yöneten ve Uyarlayan: Serdar Biliş
                Sahne ve Kostüm Tasarımı: Gamze Kuş
                Görüntü Yönetmeni : Ahmet Sesigürgil
                Müzik: Tuluğ Tırpan
                Multimedya Tasarım ve Prodüksiyon: Illusionist
                Işık Tasarımı: Cem Yılmazer
                Ses Tasarım: İzel Baybars,Ogün Kayıkçı,Başar Yurtcu
                Yardımcı Yönetmen: Serin Öztoprak, Ekremcan Arslandağ
                Metin Düzenleme: Ülkü Oktay 
                Oyun Asistanları: Ahmet Kahvecioğlu,Oğuzhan Altıntaş, Mert Yılmaz Yıldırım, Onur Erdemir, Berke Şenel
                Sanatçı Asistanı: Sibel Altan
                Dekor ve Kostüm Sorumlusu: Onur Uğu",
                "/uploads/saatleri_ayarlama_enstitüsü.png",
                "Ankara",
                "Türkiye",
                "Oran, Kudüs Cd. 26 - 1, 06550 ÇANKAYA/Ankara",
                new DateTime(2025,5,29,21,00,0),
                new DateTime(2025,5,29,21,00,0),
                1500,
                1200.00,
                true,
                true,
                @"- 13 yaş altı etkinliğe alınmamaktadır. 13 yaş ve üstü bilete tabidir.
                - Dışardan yiyecek ve içecek alınmayacaktır.
                - Organizasyon şirketinin programda ve bilet fiyatlarında değişiklik yapma hakkı saklıdır.
                - Organizasyon firması, diğer misafirleri rahatsız eden/edecek nitelikte, uygun görmediği kişileri etkinlik için bilet bedelini iade etmek koşuluyla, etkinlik mekanına kişiyi almama hakkına sahiptir.
                - Etkinlik mekanına kamera, fotoğraf makinası, ses cihazı vb. alınmayacaktır.
                - Satın alınan biletlerde iptal, iade ve değişiklik yapılmamaktadır.
                - Etkinlik boyunca ses ve görüntü kaydı yapılacaktır. Organizatör ve sanatçı daha sonra bu görüntüleri katılımcılardan herhangi bir onay almaksızın kullanma hakkına sahiptir.
                - Etkinlik alanına giriş yapan katılımcıların alandan çıkış yapmaları halinde yeni bilet satın almaları gerekmektedir.
                - Etkinlik alanına ateşli silahlar, yanıcı, patlayıcı, parlayıcı (*deodorant, *sprey, *parfüm,  vb. gibi), kesici, delici, bereleyici, saldırı ve savunma amacıyla olmasa bile fiilen saldırı ve savunmada kullanılmaya elverişli (*kask, *kamp sandalyesi, *selfie çubuğu, *tripod, *pantolon zinciri vb.) her türlü alet ve lazer imleci ile girmek yasaktır."
                ),
                (
                6,
                "European Aquatics Diving Championships Antalya 2025",
                @"European Aquatics are thrilled to welcome you to the eighth edition of the European Aquatics Diving Championships, taking place from the 22nd – 28th May 2025 in the beautiful city of Antalya, Türkiye. This competition marks another significant milestone in our sport’s history, and we are delighted to host it at the outstanding Gloria Sports Arena, a facility that exemplifies excellence in sports infrastructure.
                Antalya, situated along the Turkish Riviera, is a city that blends breathtaking natural beauty with a deep cultural heritage. With its stunning coastline, rich history, and renowned hospitality, it is the perfect setting for the competition. We are confident that all athletes, officials, and spectators will experience not only a world-class sporting event but also the warm welcome and vibrant atmosphere that make this city so special.
                Gloria Sports Arena is one of Europe’s premier sports venues, featuring an Olympic-standard diving pool and cutting-edge training facilities. This venue has already established itself as a hub for elite international competitions, and we are thrilled to bring Europe’s finest divers to this exceptional location.",
                "/uploads/avrupa_su_sporları_dalış_şampiyonası.jpg",
                "Antalya",
                "Türkiye",
                "Belek, Turizm Cd. No: 4, 07506 SERİK/Antalya",
                new DateTime(2025,5,28,17,00,0),
                new DateTime(2025,5,28,17,00,0),
                2000,
                400.00,
                true,
                true,
                @"- 12 yaş altı ve engelli katılımlıcılarımız için giriş ücretsizdir.
                - Organizasyon firması, diğer misafirleri rahatsız eden/edecek nitelikte, uygun görmediği kişileri etkinlik için bilet bedelini iade etmek koşuluyla, etkinlik mekanına kişiyi almama hakkına sahiptir.
                - Misafirlerin belirtilen oturma düzenine uyması zorunludur. Etkinlik boyunca belirlenen koltuklarda oturulması gerekmektedir.
                - Giriş esnasında barkod / bilet kontrolü yapılacağı için biletinizi ibraz etmeniz zorunludur. Öncelikle biletiniz üyelik ile alınmış ise üyelik girişi yapılıp biletlerim alanından biletinize ulaşabilirsiniz. Ulaşamadığınız durumlarda, üyelik ile biletiniz almadıysanız Biletix Müşteri hizmetlerine başvurunuz.
                - Organizatör, indirimli bilet satın alma koşullarında değişiklik yapma hakkını saklı tutar.
                - Organizatör, etkinlik alanı ve saatinde değişiklik yapma hakkına sahiptir.
                - Etkinlik alanına yiyecek ve içecek almak yasaktır.
                - Etkinlik başladıktan sonra salona seyirci alınmayacaktır.
                - Satın alınan biletlerde iptal, iade ve değişiklik yapılmamaktadır.
                - Etkinlik mekanına kamera ve fotoğraf makinası sokmak yasaktır."
                ),
                (
                7,
                "Ayasofya Tarih ve Deneyim Müzesi",
                @"Ayasofya Tarih ve Deneyim Müzesi; tarih, kültür, sanat ve teknoloji severlerin İstanbul’da mutlaka ziyaret etmesi gereken yerlerden biridir.
                Sultanahmet Meydanı’nın kalbinde, Ayasofya’ya birkaç dakika mesafede bulunan Ayasofya Tarih ve Deneyim Müzesi, ziyaretçilerini zamanda yolculuğa çıkarıyor ve dünyanın en önemli simgelerinden, en eski mabetlerinden biri olan Ayasofya’nın esrarengiz güzelliğini birçok duyuyla hissederek yaşama imkânı sunuyor.
                Ayasofya Tarih ve Deneyim Müzesi’ni ziyaret edin. İstanbul’un kalbindeki bu ikonik anıtın benzersizliğini keşfedin.
                Biletinizi şimdiden ayırtın ve sınırların ötesinde bir müze deneyimine hazır olun!
                Ayasofya Tarih ve Deneyim Müzesi her gün 09:00 – 19:00 saatleri arasında açık olacaktır.",
                "/uploads/ayasofya_tarih_deneyim_müzesi.jpg",
                "İstanbul",
                "Türkiye",
                "Binbirdirek Mah. At Meydanı Sok. No:10 Fatih / Istanbul FATİH/İstanbul",
                new DateTime(2025,12,31,09,00,0),
                new DateTime(2025,12,31,09,00,0),
                1200,
                467.50,
                true,
                true,
                @"- Ayasofya Tarih ve Deneyim Müzesi her gün 09:00 – 19:00 saatleri arasında açık olacaktır.
                - 0-8 yaş çocuk kabul edilmemekte olup ancak ebeveyn onayı doğrultusunda müzeye girişi kabul edilecektir.
                - 8 yaş üstü yetişkin olarak kabul edilmektedir. 
                - Kulaklıklar çeşitli dil seçenekleri ile birlikte müze girişinde dağıtılacaktır.
                - Diller : Türkçe, İngilizce, Almanca, İtalyanca, Bahasa, İspanyolca, Rusça, Arapça, Çince, Tayca, Farsça, Fransızca, Japonca, Korece, Portekizce
                - VIP ve Engelli misafirlerimiz için özel geçiş alanları mevcuttur.
                - Satın alınan biletler aynı gün içerisinde bir kez giriş hakkına sahiptir. Bilet iadesi yapılmamaktadır.
                - Biletiniz müze ziyaretinin kapanış saatine kadar geçerlidir, dilediğiniz saatte ziyarete başlayabilirsiniz.
                - Girişte kimlik ibrazı zorunludur."
                ),
                (
                8,
                "Ekmek Sanatı",
                @"Ekmek yapmak hiç bu kadar kolay olmamıştı!"" diyeceğiniz workshopa hazır olun!

                La Panetteria'daki Eataly ekmeklerinin sırrını öğrenmek ve kendi mutfağınızda da hazırlayabilmek için ""Ekmek Sanatı"" workshopu Eataly Mutfak Atölyesinde seni bekliyor.

                24- 25 Mayıs tarihleri arasında geçerlidir. Ders, 2 seans olarak düzenlenir. 24 Mayıs tarihli alınan biletle 25 Mayıs seansına katılım sağlanabilir.

                MENÜ:
                RUSTİC CEVİZ-ZEYTİN
                OTTO EKMEĞİ
                FOCACCİA

                Ekmek Workshop Programı:
                DERS 2 SEANS OLACAK ŞEKİLDEDİR.

                1.SEANS CUMARTESİ :

                EKŞİ MAYA YAPIMI
                HAMUR YAPIMI
                MAYALAMA TEKNİKLERİ
                HAMUR KATLAMA

                2.SEANS PAZAR:

                PİŞİRME TEKNİKLERİ
                HAMUR KESME TEKNİKLERİ
                EKMEKLERİN PİŞME SÜRECİ",
                "/uploads/ekmek_sanatı.png",
                "İstanbul",
                "Türkiye",
                "Levazım Mahallesi, Koru Sokak No:2 Zorlu Center – Köprü Katı (Bridge Floor) BEŞİKTAŞ/İstanbul",
                new DateTime(2025,5,29,13,00,0),
                new DateTime(2025,5,29,13,00,0),
                50,
                3300.00,
                true,
                false,
                @"- Workshop çalışmaları (çocuk workshopları hariç) 18 yaş ve üzeri katılımcılara yöneliktir.
                - Programlarımız, en az 4 kişinin katılımıyla gerçekleşmektedir.
                - Biletler tek kişiliktir ve her istasyonda sadece bir kişi çalışabilir.
                - Biletlerde iade ya da değişiklik kesinlikle yapılmamaktadır.
                - Workshop başlamadan önce bilet ve katılımcı isim/bilet/yaş kontrolü yapılmaktadır.
                - Tüm workshoplarda dijital isme özel “Eataly Workshop Katılım Sertifikası” verilmektedir.
                - Eataly gerekli gördüğü durumlarda, katılımcıların ödemiş olduğu etkinlik ücretini iade ederek organizasyonu iptal etmek hakkını saklı tutar.
                - Eataly gerekli gördüğü durumda etkinliklerde içerik ve tarih değişimi yapma hakkını saklı tutar.
                - Workshop boyunca yapacağınız yemeklerin fazlasının gıda atığı olmaması adına, saklama kaplarınızı yanınızda getirerek evinize götürebilir, böylece aynı zamanda sevdiklerinizle de paylaşabilirsiniz.
                - Eataly’de düzenlenen workshoplar “profesyonel eğitim” kapsamına girmemektedir. Workshoplar, hobi ve eğlence amaçlı olup; etkinliğin türüne göre farklı teorik bilgiler workshop şefi tarafından anlatılabilmektedir."
                ),
            };


            var events = eventData.Select(e => new Event
            {
                Id = e.id,
                EventName = e.eventName,
                EventDescription = e.eventDescription,
                ImageUrl = e.imageUrl,
                City = e.city,
                Country = e.country,
                Location = e.location,
                StartDate = e.startDate,
                EndDate = e.endDate,
                NumberOfTickets = e.numberOfTickets,
                TicketPrice = e.ticketPrice,
                IsOnSale = e.isOnSale,
                IsOnBanner = e.isOnBanner,
                Rules = e.rules,

            }).ToList();

            return events;

        }

        public static List<EventCategory> matchCategories()
        {
            var categoryEventData = new (int categoryId, int eventId)[]
            {
                //sahne
                (1,5),(1,1),
                //müzik
                (2,2),
                //aile
                (3,1),(3,3),(3,4),
                //spor
                (4,6),(4,4),
                //eğitim
                (5,8),(5,5),
                //tiyatro
                (8,1),(8,5),
                //dans
                (9,2),(9,4),
                //sirk
                (11,3),
                //açıkhava
                (12,2),
                //festival
                (13,2),
                //müze & sergi
                (14,7),
                //sosyal etkinlik
                (16,2),(16,3),(16,4),(16,7),
                //gösteri
                (17,1),(17,2),(17,3),(17,4),(17,5),
            };

            var categoryEvents = categoryEventData.Select(c => new EventCategory
            {
                EventId = c.eventId,
                CategoryId = c.categoryId,
            }).ToList();

            return categoryEvents;
        }


        

    }
}
