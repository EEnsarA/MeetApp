using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MeetAppApi.Migrations
{
    /// <inheritdoc />
    public partial class mig_1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EventName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EventDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NumberOfTickets = table.Column<int>(type: "int", nullable: false),
                    TicketPrice = table.Column<double>(type: "float", nullable: false),
                    IsOnSale = table.Column<bool>(type: "bit", nullable: false),
                    IsOnBanner = table.Column<bool>(type: "bit", nullable: false),
                    Rules = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HashedPassword = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Role = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EventCategories",
                columns: table => new
                {
                    EventId = table.Column<int>(type: "int", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventCategories", x => new { x.EventId, x.CategoryId });
                    table.ForeignKey(
                        name: "FK_EventCategories_Categories_EventId",
                        column: x => x.EventId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EventCategories_Events_EventId",
                        column: x => x.EventId,
                        principalTable: "Events",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Carts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Carts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Carts_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CartEvents",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CartId = table.Column<int>(type: "int", nullable: false),
                    EventId = table.Column<int>(type: "int", nullable: false),
                    NumberOfTicket = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CartEvents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CartEvents_Carts_CartId",
                        column: x => x.CartId,
                        principalTable: "Carts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CartEvents_Events_EventId",
                        column: x => x.EventId,
                        principalTable: "Events",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CartItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CartId = table.Column<int>(type: "int", nullable: false),
                    EventId = table.Column<int>(type: "int", nullable: false),
                    Count = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CartItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CartItems_Carts_CartId",
                        column: x => x.CartId,
                        principalTable: "Carts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CartItems_Events_EventId",
                        column: x => x.EventId,
                        principalTable: "Events",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CategoryName" },
                values: new object[,]
                {
                    { 1, "Sahne" },
                    { 2, "Müzik" },
                    { 3, "Aile" },
                    { 4, "Spor" },
                    { 5, "Eğitim" },
                    { 6, "İş" },
                    { 7, "Çevrimiçi" },
                    { 8, "Tiyatro" },
                    { 9, "Dans" },
                    { 10, "Stand-Up" },
                    { 11, "Sirk" },
                    { 12, "Açıkhava" },
                    { 13, "Festival" },
                    { 14, "Müze & Sergi" },
                    { 15, "Komedi" },
                    { 16, "Sosyal Etkinlikler" },
                    { 17, "Gösteri" },
                    { 18, "Dram" }
                });

            migrationBuilder.InsertData(
                table: "Events",
                columns: new[] { "Id", "City", "Country", "EndDate", "EventDescription", "EventName", "ImageUrl", "IsOnBanner", "IsOnSale", "Location", "NumberOfTickets", "Rules", "StartDate", "TicketPrice" },
                values: new object[,]
                {
                    { 1, "İstanbul", "Türkiye", new DateTime(2025, 5, 31, 16, 0, 0, 0, DateTimeKind.Unspecified), "İstanbul’un Efsaneleriyle Zaman Yolculuğuna Davetlisiniz!\r\n                Tarihin derinliklerine, efsanelerle yoğrulmuş İstanbul’un büyüleyici atmosferine adım atın! 'Legends of Istanbul' canlı oyunculu gösterisi, dijital görseller, etkileyici sahne efektleri ve destansı bir hikâye ile İstanbul’un kadim ruhunu keşfetmeye davet ediyor.\r\n                15 farklı kostümle sahneye çıkan yetenekli oyuncularımız, Medusa’nın Laneti’nden Hürrem Sultan’ın Işıltılı Dansı’na, Galata’dan Ayasofya’ya uzanan unutulmaz bir yolculuğa sizi çıkaracak. Her bir karakter, özel kostümleriyle hayat bulacak ve İstanbul’un büyüsünü sahnede yaşatacak.\r\n                Neler Bekliyor?\r\n                - Medusa’nın Laneti: Yunan mitolojisinin korkutucu güzelliği Medusa'nın intikam dolu hikâyesi.\r\n                - Yılanlardan Kaçış: Kız Kulesi'nin efsanevi hikâyesine tanıklık edin.\r\n                - Gökyüzüne Yolculuk: Hezarfen Ahmet Çelebi'nin Galata'dan Üsküdar'a uçuşunun zaferi.\r\n                - Ayasofya’nın Kuruluşu ve Fethi: Ayasofya’nın ihtişamlı geçmişi, Bizans İmparatoru I.Justinianus’un rüyasında gördüğü ilhamla başlayan inşaat süreci, Doğu Roma İmparatorluğu'nun kalbinde yükselen bu başyapıtın Osmanlı İmparatorluğu tarafından fethedilmesiyle taşınan manevi değerleri…\r\n                - Fetih Kale Kuşatması: İstanbul’un fethine dair unutulmaz bir askeri zafer.\r\n                - Hürrem Sultan’ın Işıltılı Dansı: Topkapı Sarayı’nda Hürrem Sultan’ın güç ve aşk dolu hikâyesi.\r\n                -Mimar Sinan’ın Mirası: Osmanlı’nın büyük mimarının Süleymaniye Camisi’ni inşa etme mücadelesi.\r\n                -Semazenlerin Gösterisi: Mevlana’nın öğretileri ışığında evrensel barış ve huzurun sembolü semazenler", "Legends Of İstanbul", "/uploads/legends_of_istanbul.jpg", true, true, "Alemdar Cad. No:5 Sultanahmet Fatih İstanbul (Yerebatan Sarnıcı yanı) FATİH/İstanbul", 14000, "- Gösteri başlamadan 15 dakika önce salona gelin. Gösteri başladıktan sonra geç gelen izleyiciler alınmayacaktır.\r\n                - Gösteri sırasında telefonları sessize alın veya kapatın. Işıklar veya sesler, hem oyuncuları hem de diğer izleyicileri rahatsız edebilir.\r\n                - Gösteri sırasında fotoğraf veya video çekimi yapmak yasaktır. Etkinlik sonrası fotoğraf alanlarında fotoğraf çekebilirsiniz.\r\n                - Gösteri boyunca dikkatlice izleyin ve sessiz olun. Anlatıcı ve oyuncuların performansını bölmemek için odaklanın.\r\n                - Gösteri sırasında salon içinde yiyecek ve içecek tüketimi yasaktır. \r\n                - Acil bir durumda güvenlik görevlilerinin talimatlarına uyun. Çıkış yollarını önceden öğrenin.\r\n                - Gösteri, 12 yaş ve üzeri izleyiciler için uygundur. Yüksek ses ve ışık olduğundan küçük çocuklar için etkinlik uygun olmayabilir.\r\n                - Saygılı ve olumlu bir tutum sergileyin. Rahatsız edici davranışlar gösteren izleyiciler salondan çıkarılabilir. Etkinlik sahibi ve güvenlik görevlileri izleyiciyi oyundan çıkarma hakkına sahiptir.\r\n                - Etkinliğe katılım için geçerli biletinizi temin edin. Online veya gişeden bilet alabilirsiniz.\r\n                - Engelli izleyiciler için özel erişim ve yerler bulunmaktadır. Detaylı bilgi için etkinlik öncesi bizimle iletişime geçebilirsiniz. Arka otopark tarafında engelli girişi ve wc bulunmaktadır.", new DateTime(2025, 5, 27, 16, 0, 0, 0, DateTimeKind.Unspecified), 1250.0 },
                    { 2, "İzmir", "Türkiye", new DateTime(2025, 8, 20, 12, 0, 0, 0, DateTimeKind.Unspecified), "Güzel haberler ansızın gelir!\r\n                Deniz, kum, güneş, konserler, workshoplar, oyunlar, dans, kamp ve spor... Her şeyiyle gerçek bir festival deneyimi What A Fest’te!\r\n                10’dan fazla müzik türünü bir araya getirerek katılımcılara benzersiz bir festival sunan What A Fest, 20-24 Ağustos tarihlerinde İzmir Foça’da gerçekleşiyor!\r\n                Rock müzikten alternatif popa, synth-pop’tan elektronik müziğe kadar kendi alanında özgün 30 grup ve müzisyen festivalde sahne alacak.\r\n                Müziğin her türüne ev sahipliği yapan bu festivale sen de katıl, unutulmaz anlar biriktir!", "What A Fest 2025", "/uploads/what_a_fest.jpg", true, true, "Foça FOÇA/İzmir", 5000, "- Festival alanına 18 yaş altında katılımcılar ebeveynleri ile birlikte olsa dahi giriş yapamayacaklardır. (Kimliksiz içeri alım yapılmayacaktır.)\r\n                - Dışarıdan getirilen hiçbir yiyecek ve içecek festival alanına alınmayacaktır.\r\n                - 1+1 ve çift kişilik kamp + kombine bilet alan katılımcılar ayrı çadırlar ile alana giriş yapamayacaktır. 1+1 ve çift kişilik kamp + kombine bilet alan katılımcılar tek çadırda konaklama yapabileceklerdir.\r\n                - Festival bileti alanlar, organizatör ve güvenlik ekibinin belirleyeceği üst ve çanta aranması dâhil her türlü güvenlik önlemini kabul \r\n                etmiş sayılır. Bu önlemlere uymak istemeyen katılımcıların, alana giriş haklarının iptal edileceği gibi, bilet iadeleri de yapılmayacaktır. Bütün katılımcılar kimliklerini yanında bulundurmalıdır. Katılımcıların yaşını doğrulamak amacıyla organizatör, kimlik ibrazı isteyecektir.\r\n                - Festival biletleriyle alana gelen ya da alandaki bilet satış noktasından bilet satın alan katılımcılara aldıkları biletin sınıfına göre bileklik takılır. Bu bileklik katılımcının festival alanına giriş çıkışını sağlamaktadır. Koparılan ve çıkarılan bileklikler tekrar takılamamakta ve bileklik olmadan alana giriş yapılamamaktadır. 3. şahıslardan alınan biletlerin geçerliliği ile ilgili organizatör sorumluluk kabul etmemektedir.\r\n                - Sadece kamp + kombine bilet sahipleri kamp alanında kullanmak üzere kamp sandalyesi getirebilir. Konser alanına kamp sandalyesi alınmayacaktır.\r\n                - After performanslarının sona ermesinin ardından kombine ve günlük bilet sahipleri alandan ayrılması gerekir. \r\n                - Kamp alanına yalnızca kamp+kombine biletli misafirler giriş yapabilir.\r\n                - Çadırınızın en uzun kenarı 300 cm olmalıdır.\r\n                - Paketi açılmamış bandrollü tütün mamülleri içeri alınmaktadır.\r\n                - Farklı diyet perhizi yapan misafirlerimize, alana dışarıdan yiyecek ve içecek alınmadığı için kamp alanını kullanmaları önerilmemektedir.\r\n                - İndirimli biletler sınırlı sayıdadır.\r\n                - Biletiniz mail ve sms olarak size gelecektir. Rezervasyona gerek yoktur.\r\n                - Festival alanına ses ve görüntü kaydı yapan cihazlar (telefon harici), yiyecek-içecek, cam ve plastik şişe, teneke, kamp ocağı, havai fişek, yanıcı-parlayıcı her türlü nesne (aerosol madde), silah veya keskin nesneler alınmamaktadır.", new DateTime(2025, 8, 20, 12, 0, 0, 0, DateTimeKind.Unspecified), 1500.0 },
                    { 3, "Samsun", "Türkiye", new DateTime(2025, 5, 31, 18, 0, 0, 0, DateTimeKind.Unspecified), "Ankara Çocuk Sirki çocuklara yönelik sirk gösterimidir, orijinal sirk figürleri ile eğlenceye her an kapılıp heyecanla izlemeye devam edeceğiniz, zaman zaman şaşkınlık ile süsleyeceğiniz duygu karmaşası ile hayran kalacağınız bir etkinliktir. \r\n                Sirk içerisinde;\r\n                SİHİRBAZ SHOW \r\n                TAHTA BACAK\r\n                JONGLÖR SHOW \r\n                BUBBLE SHOW \r\n                PALYAÇO SHOW, gibi birçok eğlenceli aktiviteler bulunmaktadır. \r\n                Sizler de yerinizi ayırmayı ve ANKARA ÇOCUK SİRKİ için unutulmaz sahne gösterilerinde hatıralar biriktirmeyi unutmayın. \r\n                2,12 Yaş arası için uygundur. \r\n                Süre: 45 Dk.", "Ankara Çocuk Sirki", "/uploads/cocuk_sirki.png", true, true, "Adnan Menderes Bulvarı. Deniz Evleri Mahallesi. (Yeşilyurt AVM Yanı) ATAKUM/Samsun", 3000, "- 2-12 Yaş arası için uygundur. \r\n                Süre: 45 Dk.\r\n                - Organizasyon firması, diğer misafirleri rahatsız eden/edecek nitelikte, uygun görmediği kişileri etkinlik için bilet bedelini iade etmek koşuluyla, etkinlik mekanına kişiyi almama hakkına sahiptir\r\n                - Misafirlerin belirtilen oturma düzenine uyması zorunludur. Etkinlik boyunca belirlenen koltuklarda oturulması gerekmektedir.\r\n                - Etkinlik başlangıç saatinden en az 30 dk. önce biletle birlikte etkinliğin kapısında olacak şekilde hazır olunmasını önemle rica ederiz.\r\n                - Giriş esnasında barkod / bilet kontrolü yapılacağı için biletinizi ibraz etmeniz zorunludur. Öncelikle biletiniz üyelik ile alınmış ise üyelik girişi yapılıp biletlerim alanından biletinize ulaşabilirsiniz. Ulaşamadığınız durumlarda, üyelik ile biletiniz almadıysanız Biletix Müşteri hizmetlerine başvurunuz.\r\n                - Organizatör, indirimli bilet satın alma koşullarında değişiklik yapma hakkını saklı tutar.\r\n                - Organizatör, etkinlik alanı ve saatinde değişiklik yapma hakkına sahiptir.\r\n                - Etkinlik alanına yiyecek ve içecek almak yasaktır.\r\n                - Etkinlik başladıktan sonra salona seyirci alınmayacaktır.\r\n                - Satın alınan biletlerde iptal, iade ve değişiklik yapılmamaktadır.\r\n                - Etkinlik mekanına kamera ve fotoğraf makinası sokmak yasaktır.", new DateTime(2025, 5, 31, 15, 0, 0, 0, DateTimeKind.Unspecified), 800.0 },
                    { 4, "İstanbul", "Türkiye", new DateTime(2025, 11, 1, 20, 0, 0, 0, DateTimeKind.Unspecified), "Fındıkkıran - Nutcracker on Ice\r\n                7’den 77’ye Fındıkkıran ile Buzun Üzerinde Masalsı Yolculuk\r\n                Dünyanın en önemli gösterilerinden Fındıkkıran - Nutcracker on Ice 7’den 70’de herkesi büyülemek için 1 Kasım  – 14 Kasım 2025 tarihleri arasında, Moneytolia ana sponsorluğunda Buz Adası’nda sahnelenecek! Bu eşsiz buz gösterileri, dünyanın en prestijli dans topluluklarından biri kabul edilen Imperial Ice Stars tarafından gerçekleştirilecek.\r\n                Nutcracker on Ice, dünyaca ünlü Imperial Ice Stars topluluğunun en büyüleyici prodüksiyonlarından biri olarak, her yaştan izleyiciyi buzun üzerinde masalsı bir yolculuğa çıkarırken Tchaikovsky’nin ölümsüz müziği ve Tony Mercer’in yaratıcı yönetimiyle unutulmaz bir deneyim sunacak.\r\n                Zarif buz pateni figürleri, göz kamaştırıcı kostümler ve etkileyici sahne tasarımlarıyla Nutcracker on Ice, izleyiciyi klasik masalın büyülü dünyasında bir yolculuğa çıkaracak. Orijinal hikayede olduğu gibi Clara ve ona yardımcı olan Şeker Parmaklıkları ile birlikte, izleyiciler fantastik bir geceye tanıklık edecek. Görkemli koreografi, muazzam buz pateni becerileri ve büyülü özel efektlerle bu gösteri, tiyatro ve buz pateninin mükemmel birleşimini sunuyor.", "Fındıkkıran - Nutcracker On Ice", "/uploads/fındıkkıran_on_ice.jpg", true, true, "Veliefendi, Prof. Dr. Turan Güneş Cd. 67a, 34025 ZEYTİNBURNU/İstanbul", 3500, "- Tüm katılımcılar bilete tabiidir.\r\n                - 15 yaş altı misafirler ebeveynleri refakatinden etkinliğe katılabilirler.\r\n                - Dışarıdan yiyecek ve içecek getirmemenizi önemle rica ederiz.\r\n                - Organizatör firma bilet fiyatları ve programda değişiklik yapma hakkına sahiptir.\r\n                - Etkinlik alanına kamera ve fotoğraf makinası sokmak yasaktır.\r\n                - Organizatör firma etkinlik için uygun görmediği kişileri bilet bedelini iade etmek koşuluyla etkinlik mekanına almama hakkına sahiptir.", new DateTime(2025, 11, 1, 13, 30, 0, 0, DateTimeKind.Unspecified), 1000.0 },
                    { 5, "Ankara", "Türkiye", new DateTime(2025, 5, 29, 21, 0, 0, 0, DateTimeKind.Unspecified), "Doğu ve Batı, eski ve yeni, geleneksel ve modern kutupları arasında salınıp duran Ahmet Hamdi Tanpınar’ın ölümsüz eseri Saatleri Ayarlama Enstitüsü, Serkan Keskin’in onlarca surete büründüğü bir oyunculuk şöleniyle sinema ve tiyatronun iç içe geçtiği çağdaş bir uyarlama olarak izleyici ile buluşuyor. Serdar Biliş’in yönetmenliğinde sahneye uyarlanan oyunun müziklerini Tuluğ Tırpan besteliyor.\r\n                Yazan: Ahmet Hamdi Tanpınar\r\n                Yöneten ve Uyarlayan: Serdar Biliş\r\n                Sahne ve Kostüm Tasarımı: Gamze Kuş\r\n                Görüntü Yönetmeni : Ahmet Sesigürgil\r\n                Müzik: Tuluğ Tırpan\r\n                Multimedya Tasarım ve Prodüksiyon: Illusionist\r\n                Işık Tasarımı: Cem Yılmazer\r\n                Ses Tasarım: İzel Baybars,Ogün Kayıkçı,Başar Yurtcu\r\n                Yardımcı Yönetmen: Serin Öztoprak, Ekremcan Arslandağ\r\n                Metin Düzenleme: Ülkü Oktay \r\n                Oyun Asistanları: Ahmet Kahvecioğlu,Oğuzhan Altıntaş, Mert Yılmaz Yıldırım, Onur Erdemir, Berke Şenel\r\n                Sanatçı Asistanı: Sibel Altan\r\n                Dekor ve Kostüm Sorumlusu: Onur Uğu", "Saatleri Ayarlama Enstitüsü", "/uploads/saatleri_ayarlama_enstitüsü.png", true, true, "Oran, Kudüs Cd. 26 - 1, 06550 ÇANKAYA/Ankara", 1500, "- 13 yaş altı etkinliğe alınmamaktadır. 13 yaş ve üstü bilete tabidir.\r\n                - Dışardan yiyecek ve içecek alınmayacaktır.\r\n                - Organizasyon şirketinin programda ve bilet fiyatlarında değişiklik yapma hakkı saklıdır.\r\n                - Organizasyon firması, diğer misafirleri rahatsız eden/edecek nitelikte, uygun görmediği kişileri etkinlik için bilet bedelini iade etmek koşuluyla, etkinlik mekanına kişiyi almama hakkına sahiptir.\r\n                - Etkinlik mekanına kamera, fotoğraf makinası, ses cihazı vb. alınmayacaktır.\r\n                - Satın alınan biletlerde iptal, iade ve değişiklik yapılmamaktadır.\r\n                - Etkinlik boyunca ses ve görüntü kaydı yapılacaktır. Organizatör ve sanatçı daha sonra bu görüntüleri katılımcılardan herhangi bir onay almaksızın kullanma hakkına sahiptir.\r\n                - Etkinlik alanına giriş yapan katılımcıların alandan çıkış yapmaları halinde yeni bilet satın almaları gerekmektedir.\r\n                - Etkinlik alanına ateşli silahlar, yanıcı, patlayıcı, parlayıcı (*deodorant, *sprey, *parfüm,  vb. gibi), kesici, delici, bereleyici, saldırı ve savunma amacıyla olmasa bile fiilen saldırı ve savunmada kullanılmaya elverişli (*kask, *kamp sandalyesi, *selfie çubuğu, *tripod, *pantolon zinciri vb.) her türlü alet ve lazer imleci ile girmek yasaktır.", new DateTime(2025, 5, 29, 21, 0, 0, 0, DateTimeKind.Unspecified), 1200.0 },
                    { 6, "Antalya", "Türkiye", new DateTime(2025, 5, 28, 17, 0, 0, 0, DateTimeKind.Unspecified), "European Aquatics are thrilled to welcome you to the eighth edition of the European Aquatics Diving Championships, taking place from the 22nd – 28th May 2025 in the beautiful city of Antalya, Türkiye. This competition marks another significant milestone in our sport’s history, and we are delighted to host it at the outstanding Gloria Sports Arena, a facility that exemplifies excellence in sports infrastructure.\r\n                Antalya, situated along the Turkish Riviera, is a city that blends breathtaking natural beauty with a deep cultural heritage. With its stunning coastline, rich history, and renowned hospitality, it is the perfect setting for the competition. We are confident that all athletes, officials, and spectators will experience not only a world-class sporting event but also the warm welcome and vibrant atmosphere that make this city so special.\r\n                Gloria Sports Arena is one of Europe’s premier sports venues, featuring an Olympic-standard diving pool and cutting-edge training facilities. This venue has already established itself as a hub for elite international competitions, and we are thrilled to bring Europe’s finest divers to this exceptional location.", "European Aquatics Diving Championships Antalya 2025", "/uploads/avrupa_su_sporları_dalış_şampiyonası.jpg", true, true, "Belek, Turizm Cd. No: 4, 07506 SERİK/Antalya", 2000, "- 12 yaş altı ve engelli katılımlıcılarımız için giriş ücretsizdir.\r\n                - Organizasyon firması, diğer misafirleri rahatsız eden/edecek nitelikte, uygun görmediği kişileri etkinlik için bilet bedelini iade etmek koşuluyla, etkinlik mekanına kişiyi almama hakkına sahiptir.\r\n                - Misafirlerin belirtilen oturma düzenine uyması zorunludur. Etkinlik boyunca belirlenen koltuklarda oturulması gerekmektedir.\r\n                - Giriş esnasında barkod / bilet kontrolü yapılacağı için biletinizi ibraz etmeniz zorunludur. Öncelikle biletiniz üyelik ile alınmış ise üyelik girişi yapılıp biletlerim alanından biletinize ulaşabilirsiniz. Ulaşamadığınız durumlarda, üyelik ile biletiniz almadıysanız Biletix Müşteri hizmetlerine başvurunuz.\r\n                - Organizatör, indirimli bilet satın alma koşullarında değişiklik yapma hakkını saklı tutar.\r\n                - Organizatör, etkinlik alanı ve saatinde değişiklik yapma hakkına sahiptir.\r\n                - Etkinlik alanına yiyecek ve içecek almak yasaktır.\r\n                - Etkinlik başladıktan sonra salona seyirci alınmayacaktır.\r\n                - Satın alınan biletlerde iptal, iade ve değişiklik yapılmamaktadır.\r\n                - Etkinlik mekanına kamera ve fotoğraf makinası sokmak yasaktır.", new DateTime(2025, 5, 28, 17, 0, 0, 0, DateTimeKind.Unspecified), 400.0 },
                    { 7, "İstanbul", "Türkiye", new DateTime(2025, 12, 31, 9, 0, 0, 0, DateTimeKind.Unspecified), "Ayasofya Tarih ve Deneyim Müzesi; tarih, kültür, sanat ve teknoloji severlerin İstanbul’da mutlaka ziyaret etmesi gereken yerlerden biridir.\r\n                Sultanahmet Meydanı’nın kalbinde, Ayasofya’ya birkaç dakika mesafede bulunan Ayasofya Tarih ve Deneyim Müzesi, ziyaretçilerini zamanda yolculuğa çıkarıyor ve dünyanın en önemli simgelerinden, en eski mabetlerinden biri olan Ayasofya’nın esrarengiz güzelliğini birçok duyuyla hissederek yaşama imkânı sunuyor.\r\n                Ayasofya Tarih ve Deneyim Müzesi’ni ziyaret edin. İstanbul’un kalbindeki bu ikonik anıtın benzersizliğini keşfedin.\r\n                Biletinizi şimdiden ayırtın ve sınırların ötesinde bir müze deneyimine hazır olun!\r\n                Ayasofya Tarih ve Deneyim Müzesi her gün 09:00 – 19:00 saatleri arasında açık olacaktır.", "Ayasofya Tarih ve Deneyim Müzesi", "/uploads/ayasofya_tarih_deneyim_müzesi.jpg", true, true, "Binbirdirek Mah. At Meydanı Sok. No:10 Fatih / Istanbul FATİH/İstanbul", 1200, "- Ayasofya Tarih ve Deneyim Müzesi her gün 09:00 – 19:00 saatleri arasında açık olacaktır.\r\n                - 0-8 yaş çocuk kabul edilmemekte olup ancak ebeveyn onayı doğrultusunda müzeye girişi kabul edilecektir.\r\n                - 8 yaş üstü yetişkin olarak kabul edilmektedir. \r\n                - Kulaklıklar çeşitli dil seçenekleri ile birlikte müze girişinde dağıtılacaktır.\r\n                - Diller : Türkçe, İngilizce, Almanca, İtalyanca, Bahasa, İspanyolca, Rusça, Arapça, Çince, Tayca, Farsça, Fransızca, Japonca, Korece, Portekizce\r\n                - VIP ve Engelli misafirlerimiz için özel geçiş alanları mevcuttur.\r\n                - Satın alınan biletler aynı gün içerisinde bir kez giriş hakkına sahiptir. Bilet iadesi yapılmamaktadır.\r\n                - Biletiniz müze ziyaretinin kapanış saatine kadar geçerlidir, dilediğiniz saatte ziyarete başlayabilirsiniz.\r\n                - Girişte kimlik ibrazı zorunludur.", new DateTime(2025, 12, 31, 9, 0, 0, 0, DateTimeKind.Unspecified), 467.5 },
                    { 8, "İstanbul", "Türkiye", new DateTime(2025, 5, 29, 13, 0, 0, 0, DateTimeKind.Unspecified), "Ekmek yapmak hiç bu kadar kolay olmamıştı!\" diyeceğiniz workshopa hazır olun!\r\n\r\n                La Panetteria'daki Eataly ekmeklerinin sırrını öğrenmek ve kendi mutfağınızda da hazırlayabilmek için \"Ekmek Sanatı\" workshopu Eataly Mutfak Atölyesinde seni bekliyor.\r\n\r\n                24- 25 Mayıs tarihleri arasında geçerlidir. Ders, 2 seans olarak düzenlenir. 24 Mayıs tarihli alınan biletle 25 Mayıs seansına katılım sağlanabilir.\r\n\r\n                MENÜ:\r\n                RUSTİC CEVİZ-ZEYTİN\r\n                OTTO EKMEĞİ\r\n                FOCACCİA\r\n\r\n                Ekmek Workshop Programı:\r\n                DERS 2 SEANS OLACAK ŞEKİLDEDİR.\r\n\r\n                1.SEANS CUMARTESİ :\r\n\r\n                EKŞİ MAYA YAPIMI\r\n                HAMUR YAPIMI\r\n                MAYALAMA TEKNİKLERİ\r\n                HAMUR KATLAMA\r\n\r\n                2.SEANS PAZAR:\r\n\r\n                PİŞİRME TEKNİKLERİ\r\n                HAMUR KESME TEKNİKLERİ\r\n                EKMEKLERİN PİŞME SÜRECİ", "Ekmek Sanatı", "/uploads/ekmek_sanatı.png", false, true, "Levazım Mahallesi, Koru Sokak No:2 Zorlu Center – Köprü Katı (Bridge Floor) BEŞİKTAŞ/İstanbul", 50, "- Workshop çalışmaları (çocuk workshopları hariç) 18 yaş ve üzeri katılımcılara yöneliktir.\r\n                - Programlarımız, en az 4 kişinin katılımıyla gerçekleşmektedir.\r\n                - Biletler tek kişiliktir ve her istasyonda sadece bir kişi çalışabilir.\r\n                - Biletlerde iade ya da değişiklik kesinlikle yapılmamaktadır.\r\n                - Workshop başlamadan önce bilet ve katılımcı isim/bilet/yaş kontrolü yapılmaktadır.\r\n                - Tüm workshoplarda dijital isme özel “Eataly Workshop Katılım Sertifikası” verilmektedir.\r\n                - Eataly gerekli gördüğü durumlarda, katılımcıların ödemiş olduğu etkinlik ücretini iade ederek organizasyonu iptal etmek hakkını saklı tutar.\r\n                - Eataly gerekli gördüğü durumda etkinliklerde içerik ve tarih değişimi yapma hakkını saklı tutar.\r\n                - Workshop boyunca yapacağınız yemeklerin fazlasının gıda atığı olmaması adına, saklama kaplarınızı yanınızda getirerek evinize götürebilir, böylece aynı zamanda sevdiklerinizle de paylaşabilirsiniz.\r\n                - Eataly’de düzenlenen workshoplar “profesyonel eğitim” kapsamına girmemektedir. Workshoplar, hobi ve eğlence amaçlı olup; etkinliğin türüne göre farklı teorik bilgiler workshop şefi tarafından anlatılabilmektedir.", new DateTime(2025, 5, 29, 13, 0, 0, 0, DateTimeKind.Unspecified), 3300.0 },
                    { 9, "Edirne", "Türkiye", new DateTime(2025, 7, 31, 14, 0, 0, 0, DateTimeKind.Unspecified), "Trakya Müzik Festivali, 31 Temmuz/1-2-3 Ağustos tarihlerinde sizleri bekliyor!\r\n                Türkiye’nin en büyük müzik festivallerinden biri olan Trakya Müzik Festivali, her yıl binlerce müzikseveri Saros Körfezi’nin benzersiz doğasında bir araya getiriyor.\r\n                Denizin hemen yanı başında, eşsiz gün batımları eşliğinde günler süren müzik ve eğlence, festival ruhunu en üst seviyede yaşatıyor. Alternatif, rock, pop ve elektronik müzik sahnesinin en sevilen isimlerinin performanslarıyla dolu bu unutulmaz etkinlik, katılımcılara sadece müzik değil; doğayla iç içe, özgür ve sınırsız bir festival deneyimi sunuyor. Kamp alanında konaklayarak yıldızların altında uyanabilir, denizin tadını çıkarabilir ve gün boyu süren etkinliklerle festivalin enerjisine kendini bırakabilirsin.\r\n                Her yıl daha da büyüyen Trakya Müzik Festivali, müzik, doğa ve eğlenceyi bir arada yaşamak isteyenler için yılın en özel etkinliklerinden biri olmaya devam ediyor.", "Trakya Müzik Festivali 2025", "/uploads/trakya_müzik_fest.jpg", false, true, "Soroz Körfezi/KEŞAN/Edirne", 2500, "- Kapı açılış saati 14:00\r\n                - 18 yaş sınırı yoktur, 18 yaş altındaki katılımcılara farklı renkte bileklik takılacaktır.\r\n                - Festival biletlerinin iade edilmesi veya festival biletlerinde değişiklik yapılması mümkün değildir.\r\n                - Festival biletinin kaybolması veya çalınması, alıcı sorumluluğundadır. Çalınan ya da kaybolan biletin yenisiyle değiştirilmesi veya para iadesi mümkün değildir.\r\n                - Festival alanına profesyonel ses ve görüntü kaydı yapan cihazlar, içecekler, cam, plastik şişe, teneke, havai fişek, yanıcı parlayıcı her türlü nesne (parfüm, böcek ilacı vb.), silah veya keskin nesneler getirmek yasaktır. Ayrıca yanınızda getirmeyi planladığınız katlanabilir sandalye ya da şemsiyeler güvenlik tarafından içeri alınmayabilir. \r\n                - Festival biletini satın alanlar, festival konserlerinin görüntü ve/veya ses kaydından alıntı yapamaz, bu konserlerin ve sanatçıların görüntülerini içeren görsel ve/veya işitsel kayıtları kaydedemez, ses ve görüntü taşıyıcılara ve/veya fonogramlara kayıt ederek çoğaltamaz ve yayımlayamaz ve umuma dağıtamaz, TV kanallarında, internet mecrasında ve GSM operatörleri kanalıyla yayınlanamaz.\r\n                - Festival alanında ateş yakmak kesinlikle yasaktır.", new DateTime(2025, 7, 31, 14, 0, 0, 0, DateTimeKind.Unspecified), 1200.0 },
                    { 10, "Eskişehir", "Türkiye", new DateTime(2025, 5, 27, 20, 30, 0, 0, DateTimeKind.Unspecified), "Türkiye, Avrupa ve Amerika’da ve dünyanın farklı şehirlerinde gerçekleştirdiği tek kişilik gösterisinde kendi yaşamından ve bu topraklarda güldürü niteliği taşıyan her olaydan beslenen Doğu Demirkol, bu sezon da seyircisi ile buluşmaya devam ediyor.", "Doğu Demirkol", "/uploads/doğu_demirkol_standup.jpg", true, true, "Eskişehir Atatürk Kültür Sanat ve Kongre Merkezi, Eskişehir", 920, "- Etkinlik girişinde bilet kontrolü yapılacaktır, biletinizi telefondan göstermeniz gerekmektedir.\r\n                - 8 yaşından küçük çocuklar etkinliğe alınmamaktadır. 8 yaş ve üzeri bilete tabidir.\r\n                - Dışardan yiyecek ve içecek alınmayacaktır.\r\n                - Organizasyon şirketinin programda ve bilet fiyatlarında değişiklik yapma hakkı saklıdır.\r\n                - Organizasyon firması, diğer misafirleri rahatsız eden/edecek nitelikte, uygun görmediği kişileri etkinlik için bilet bedelini iade etmek koşuluyla, etkinlik mekanına kişiyi almama hakkına sahiptir.\r\n                - Etkinlik mekanına kamera, fotoğraf makinası, ses cihazı vb. alınmayacaktır.\r\n                - Satın alınan biletlerde iptal, iade ve değişiklik yapılmamaktadır.\r\n                - Etkinlik boyunca ses ve görüntü kaydı yapılacaktır. Organizatör ve sanatçı daha sonra bu görüntüleri katılımcılardan herhangi bir onay almaksızın kullanma hakkına sahiptir.- Etkinlik alanına giriş yapan katılımcıların alandan çıkış yapmaları halinde yeni bilet satın almaları gerekmektedir.\r\n                - Etkinlik alanına ateşli silahlar, yanıcı, patlayıcı, parlayıcı (*deodorant, *sprey, *parfüm,  vb. gibi), kesici, delici, bereleyici, saldırı ve savunma amacıyla olmasa bile fiilen saldırı ve savunmada kullanılmaya elverişli (*kask, *kamp sandalyesi, *selfie çubuğu, *tripod, *pantolon zinciri vb.) her türlü alet ve lazer imleci ile girmek yasaktır.", new DateTime(2025, 5, 27, 20, 30, 0, 0, DateTimeKind.Unspecified), 1250.0 },
                    { 11, "İstanbul", "Türkiye", new DateTime(2025, 5, 31, 14, 0, 0, 0, DateTimeKind.Unspecified), "İstanbul Diyalog Müzesi, yepyeni bir deneyimle karşınızda! \"Paint in the Dark\", neon ışıklar altında floresan boyalarla gerçekleşen bir sanat şöleni! Bu gizemli atmosferde hayal gücünüzü serbest bırakın ve içinizdeki sanatçıyı keşfedin.\r\n                Paint in the Dark\" , sıradışı ve unutulmaz bir resim atölyesi deneyimi sunuyor. Burada resim yapmak sadece bir etkinlik değil, aynı zamanda kendinizi ifade etmenin ve sanatı keşfetmenin bir yolu! Üstelik, resim yeteneğinizin olması gerekmiyor!\r\n                Atölyemiz, herkesin katılımına açık.", "Paint in the Dark – Karanlıkta Resim", "/uploads/karanlıkta_resim.png", true, true, "İstanbul Diyalog Müzesi, Büyükdere Cad. Şişli / Esentepe GAYRETTEPE/İstanbul", 1510, "- Seanslar 16 adet biletle sınırlıdır.\r\n                - Etkinlik girişinde bilet kontrolü yapılacaktır.\r\n                - Etkinlik başlamadan 15 dakika önce etkinlik alanında olmanızı önemle rica ederiz.\r\n                - Etkinlik yaş sınırı ebeveyninin eşlik etmesi koşuluyla 7'dir.\r\n                - Ebeveynin de bilet alması gerekmektedir. Bireysel olarak katılımda yaş sınırı 12'dir.", new DateTime(2025, 5, 30, 14, 0, 0, 0, DateTimeKind.Unspecified), 950.0 },
                    { 12, "Ankara", "Türkiye", new DateTime(2025, 6, 15, 16, 30, 0, 0, DateTimeKind.Unspecified), "Bir varmış bir yokmuş. Ülkenin birinde yaşayan bir çiftçinin dünyalar güzeli, saçları altın sarısı, güzeller mi güzeli kızları Rapunzel dünyaya gelmiş. Bütün ülke Rapunzelin saçlarının sihirli olduğunu düşünüyormuş, bunu duyan cadı Rapunzeli görmek için hatta onu almak için yollara düşmüş.\r\n                Aradan yıllar geçmiş Rapunzel büyümüş cadı onu bir kuleye hapsetmiş ama Rapunzel insanları tanımak, hayvanları, ağaçları, denizleri görmek, dünyayı gezmek istiyormuş. Bir gün Ülkenin prensi tesadüfen kuleyi görmüş ve Rapunzelle tanışmış. Rapunzel ve Prens arkadaş olmuşlar. Prens Rapunzeli kuleden çıkması için ikna etmiş.\r\n                Ama Rapunzel cadıya yakalanmış. Bakalım bu hikayenin devamında Prens ve Rapunzel nasıl bir maceranın içinde olacaklar. İzlemeden bilemeyiz. Belki de cadı iyi bir insan olmaya karar verir, belki Rapunzel babasına kavuşur. Ne dersiniz hadi gelin hikayemizi izlerken hep birlikte öğrenelim.\r\n                Yapımcı: Hasan ACAR\r\n                Uyarlayan ve Yöneten: Nahide AYNI\r\n                Yazan: Yağmur ARAL\r\n                Oyuncular: Rabia ÇELİK, Canan Cansev BAŞKÖK, Çağrı ÇAKIR, Heja ACAR\r\n                Kostüm: Sinem SOYDAN\r\n                Dekor Tasarımı: Duygu GÖKALP\r\n                Işık ve Ses: Yağmur ARAL\r\n                ", "Rapunzel", "/uploads/rapunzel.jpg", true, true, "Çayyolu Sahne, Dumlupınar Bulvarı No:381 Sisa Kule B Blok No:4 ÇAYYOLU/Ankara", 1850, "- Etkinlikte 3 yaş sınırı vardır.\r\n                - Organizasyon firması, diğer misafirleri rahatsız eden/edecek nitelikte, uygun görmediği kişileri etkinlik için bilet bedelini iade etmek koşuluyla, etkinlik mekanına kişiyi almama hakkına sahiptir.\r\n                - Misafirlerin belirtilen oturma düzenine uyması zorunludur. Etkinlik boyunca belirlenen koltuklarda oturulması gerekmektedir.\r\n                - Etkinlik başlangıç saatinden en az 30 dk. önce biletle birlikte etkinliğin kapısında olacak şekilde hazır olunmasını önemle rica ederiz.\r\n                - Giriş esnasında barkod / bilet kontrolü yapılacağı için biletinizi ibraz etmeniz zorunludur. Öncelikle biletiniz üyelik ile alınmış ise üyelik girişi yapılıp biletlerim alanından biletinize ulaşabilirsiniz. Ulaşamadığınız durumlarda, üyelik ile biletiniz almadıysanız Biletix Müşteri hizmetlerine başvurunuz.\r\n                - Organizatör, indirimli bilet satın alma koşullarında değişiklik yapma hakkını saklı tutar.\r\n                - Organizatör, etkinlik alanı ve saatinde değişiklik yapma hakkına sahiptir.\r\n                - Etkinlik alanına yiyecek ve içecek almak yasaktır.\r\n                - Etkinlik başladıktan sonra salona seyirci alınmayacaktır.\r\n                - Satın alınan biletlerde iptal, iade ve değişiklik yapılmamaktadır.\r\n                - Etkinlik mekanına kamera ve fotoğraf makinası sokmak yasaktır.", new DateTime(2025, 6, 15, 16, 30, 0, 0, DateTimeKind.Unspecified), 333.0 },
                    { 13, "Bursa", "Türkiye", new DateTime(2025, 6, 26, 20, 30, 0, 0, DateTimeKind.Unspecified), "Baturay Özdemir Yeni Gösterisi ile şehrine geliyor...", "Baturay Özdemir - Stand Up", "/uploads/baturay_özdemir_standup.jpg", false, true, "DasDas Bursa, İstiklal, Fuat Kuşçuoğlu Cd. No:13 D:22, 16200 OSMANGAZİ/Bursa", 1630, "- Etkinlik 13 yaş ve üstü katılımcılar için uygundur. 13 yaş altı etkinliğe alınmamaktadır.\r\n                - Etkinlik başlangıç saatinden en az 30 dk. önce biletle birlikte etkinliğin kapısında olacak şekilde hazır olunması gerekmektedir.\r\n                - Misafirlerin, belirtilen oturma düzenine uyması zorunludur. Etkinlik boyunca belirlenen koltuklarda oturulması gerekmektedir.\r\n                - Organizatör, etkinlik alanı ve saatinde değişiklik yapma hakkına sahiptir.\r\n                - Organizatör, etkinlik için uygun görmediği kişileri, bilet ücretini iade ederek etkinlik mekanına almama hakkına sahiptir.\r\n                - Etkinlik mekanına yiyecek ve içecek sokmak yasaktır.\r\n                - Etkinlik mekanına kamera ve fotoğraf makinası sokmak yasaktır.\r\n                - Etkinlikte görüntü ve ses kaydı alınacaktır,\r\n                - Etkinlik başladıktan sonra gelen seyircilerimizin satın almış oldukları koltuğa oturamama durumundan Biletix ve Organizatör sorumlu değildir. Organizatör firma ve Biletix geç kalan misafirler için koltuk garantisi vermez. Bu sebeple salona etkinlik saatinden önce gelmenizi önemle rica ederiz.", new DateTime(2025, 6, 26, 20, 30, 0, 0, DateTimeKind.Unspecified), 900.0 },
                    { 14, "İzmir", "Türkiye", new DateTime(2025, 6, 12, 21, 0, 0, 0, DateTimeKind.Unspecified), "Anadolu Ateşi yanmaya devam ediyor!\r\n                Anadolu Ateşi'nin temel konsepti medeniyetler buluşmasıdır. Doğu ile batı kültürlerinin buluşmasını hedefleyen, evrensel barış mesajları veren bir dans portresidir. Halk danslarını bale, modern dans ve dansın diğer disiplinleri ile sentezleyerek dünyaya modern standartlarda bir gösteriyi, bir kültürel şöleni sunmaktadır. Kaynağını Anadolu’nun binlerce yıllık mitolojik ve kültürel tarihinden alan Anadolu  Ateşi hemen hemen her yöreden derlenmiş 3000 halk dansı figürü ve halk müziğini içinde barındıran özgün bir projedir. Mustafa Erdoğan imzasını taşıyan proje, Anadolu’nun binlerce yıllık kültür ve tarih mozaiğinin barışla harmanlanan ateşini tüm dünyaya tanıtmayı hedeflemektedir.\r\n                1999 yılında, yıllar öncesine dayanan bir hayali gerçekleştirmek üzere ilk adımını atan Mustafa Erdoğan, eski adı Sultan’s of the Dance olan projenin tempolu çalışmalarını  başlattı. Önce gazetelere “dansçı aranıyor” ilanları verildi. 750 aday arasından 90 genç  seçildi ve bir buçuk yıl sürecek zorlu bir çalışma temposu başladı. Günde 8, zaman zaman 16 saat süren çalışmalar... Kostümler hazırlandı, müzikler tamamlandı. Estetik egzersiz, dietisyen ve masaj uzmanları ile çalışıldı. Strech ve yoga yapıldı. Çalışmalar halk dansları adımları", "Anadolu Ateşi", "/uploads/anadolu_ateşi.png", true, true, "İzmir Kültürpark Açıkhava Tiyatrosu, Akdeniz, Fuar Alanı, 35210 MERKEZ/İzmir", 2870, "- Etkinlik başladıktan sonra salona seyirci alınmayacaktır.\r\n                - Satın alınan biletlerde iptal, iade ve değişiklik yapılmamaktadır.\r\n                - 6 yaş altı alana alınmamaktadır.\r\n                - 6 Yaş ve üzeri tam bilete tabidir.\r\n                - Etkinlik mekanına kamera, fotoğraf makinası, ses kayıt cihazı vb. alınmayacaktır.\r\n                - Etkinlik mekanına yiyecek-içecek vb alınmayacaktır.\r\n                - Etkinlik başlangıç saatinden en az 30 dakika önce mekanda hazır olmanızı önemle rica ederiz.\r\n                - Katılımcılar/izleyiciler bileti üzerinde yazan koltuk numarasına oturmak zorundadır.  Bu kurala uymayan ve yer değişikliğinde ısrar eden katılımcılar etkinlik alanı dışına alınacaktır.\r\n                - Etkinlik girişinde bilet kontrolü yapılacaktır, biletinizi telefondan göstermeniz gerekmektedir. Biletler tek kişiliktir.", new DateTime(2025, 6, 12, 21, 0, 0, 0, DateTimeKind.Unspecified), 1500.0 },
                    { 15, "Antalya", "Türkiye", new DateTime(2025, 6, 20, 20, 0, 0, 0, DateTimeKind.Unspecified), "Parfüm Atölyesi: Kendi Benzersiz Parfümünüzü Yaratın!\r\n\r\n                Hayalinizdeki parfümü yaratmak için ilk adımı atın! Parfüm atölyemizde deneyimli eğitmenlerimiz eşliğinde, parfüm yapımının inceliklerini öğrenerek kişisel tarzınıza uygun benzersiz bir parfüm oluşturabilirsiniz. Taze, çiçeksi, odunsu veya baharatlı... Hangi kokuyu tercih ediyorsanız, bu atölyede 50 ml'lik bir premium şişede %25 esans oranına sahip kendi imzanızı taşıyan kokuyu yaratabilirsiniz. \r\n\r\n                Kendi parfümünüzü oluşturun ve kişisel kokunuzu keşfedin!\r\n                Yaratıcılığınızı konuşturun, kokularla duygusal bir bağ kurun.\r\n                Çay ve lokum eşliğinde keyifli bir ortamda deneyimleyin.\r\n\r\n                Kendiniz veya sevdikleriniz için unutulmaz bir hediye yaratın veya özel bir gün için mükemmel bir etkinlik deneyimi yaşayın.\r\n\r\n                Benzersiz bir parfüm, eşsiz bir deneyim!", "Parfüm Yapım Atölyesi", "/uploads/parfüm_yapım_atolyesi.jpg", false, true, "Highlights in Antalya Workshops, Tahılpazarı mh. 471. sokak Emel-2 İş Merkezi No:3 K:7 BB: 31 İçkapı: 702 MURATPAŞA/Antalya", 50, "- Atölye tecrübe gerektirmiyor.\r\n                - Etkinlikte kullanılacak tüm malzemeler bilet fiyatına dahildir.\r\n                - Bu etkinlik rezervasyonludur. Bilet alınmadan önce 0545 763 16 77 telefon numarasından yer ayırtılmalıdır.\r\n                - Atölye esnasında sıcak içecekler, su ve lokum ikramı yapılmaktadır.\r\n                - Atölye 5 yaş ve üzeri katılımcılara uygundur.\r\n                - Etkinlik ortalama 2 saat sürmektedir.\r\n                - Katılımcılar seansa yiyecek-içecek getirebilirler.\r\n                - Etkinliğe gecikme süresi 15 dakikadır, 15 dakikadan sonra katılım gerçekleştirilemez.\r\n                - Satın alınan biletler programda değişiklik olmadığı sürece iade edilemez.", new DateTime(2025, 6, 20, 16, 0, 0, 0, DateTimeKind.Unspecified), 1000.0 }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedTime", "Email", "FirstName", "HashedPassword", "LastName", "Location", "Role", "UserName" },
                values: new object[,]
                {
                    { 1, new DateTime(2025, 5, 20, 21, 11, 5, 161, DateTimeKind.Local).AddTicks(3889), "ensar.atc@gmail.com", "Ensar", "$2a$11$mVSKTS47oUdgPYbeaulHlOI.arCPZkXc/55Q3xzyMY8D38Q4nXRBK", "Atıcı", "Erzincan/TR", 1, "ensaratc_" },
                    { 2, new DateTime(2025, 5, 20, 21, 11, 5, 161, DateTimeKind.Local).AddTicks(3907), "john@hotmail.com", "John", "$2a$11$T4KBuawt3/.QmoRkuHJHW.JmjZ4iOp7eNOzGnzbN2/LXAjGTxPcYe", "Doe", "Washington/US", 0, "john_doe" },
                    { 3, new DateTime(2025, 5, 20, 21, 11, 5, 161, DateTimeKind.Local).AddTicks(3909), "yıldız@gmail.com", "Ahmet", "$2a$11$e0w508ZJyZo5wL3YWLVQLOmCemlgbIRKWrDJKghp5wrEy76iURLI6", "Yıldız", "Ankara/TR", 0, "Yıldız_1903" }
                });

            migrationBuilder.InsertData(
                table: "Carts",
                columns: new[] { "Id", "UserId" },
                values: new object[,]
                {
                    { 1, 2 },
                    { 2, 3 }
                });

            migrationBuilder.InsertData(
                table: "EventCategories",
                columns: new[] { "CategoryId", "EventId" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 3, 1 },
                    { 8, 1 },
                    { 17, 1 },
                    { 2, 2 },
                    { 9, 2 },
                    { 12, 2 },
                    { 13, 2 },
                    { 16, 2 },
                    { 17, 2 },
                    { 3, 3 },
                    { 11, 3 },
                    { 16, 3 },
                    { 17, 3 },
                    { 3, 4 },
                    { 4, 4 },
                    { 9, 4 },
                    { 16, 4 },
                    { 17, 4 },
                    { 1, 5 },
                    { 5, 5 },
                    { 8, 5 },
                    { 17, 5 },
                    { 4, 6 },
                    { 3, 7 },
                    { 5, 7 },
                    { 14, 7 },
                    { 16, 7 },
                    { 5, 8 },
                    { 1, 9 },
                    { 2, 9 },
                    { 9, 9 },
                    { 12, 9 },
                    { 13, 9 },
                    { 16, 9 },
                    { 1, 10 },
                    { 10, 10 },
                    { 16, 10 },
                    { 3, 11 },
                    { 5, 11 },
                    { 14, 11 },
                    { 1, 12 },
                    { 3, 12 },
                    { 8, 12 },
                    { 9, 12 },
                    { 17, 12 },
                    { 1, 13 },
                    { 10, 13 },
                    { 16, 13 },
                    { 1, 14 },
                    { 2, 14 },
                    { 9, 14 },
                    { 12, 14 },
                    { 13, 14 },
                    { 16, 14 },
                    { 5, 15 }
                });

            migrationBuilder.InsertData(
                table: "CartItems",
                columns: new[] { "Id", "CartId", "Count", "EventId" },
                values: new object[,]
                {
                    { 1, 1, 1, 2 },
                    { 2, 1, 1, 4 },
                    { 3, 2, 1, 6 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_CartEvents_CartId",
                table: "CartEvents",
                column: "CartId");

            migrationBuilder.CreateIndex(
                name: "IX_CartEvents_EventId",
                table: "CartEvents",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_CartItems_CartId",
                table: "CartItems",
                column: "CartId");

            migrationBuilder.CreateIndex(
                name: "IX_CartItems_EventId",
                table: "CartItems",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_Carts_UserId",
                table: "Carts",
                column: "UserId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CartEvents");

            migrationBuilder.DropTable(
                name: "CartItems");

            migrationBuilder.DropTable(
                name: "EventCategories");

            migrationBuilder.DropTable(
                name: "Carts");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Events");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
