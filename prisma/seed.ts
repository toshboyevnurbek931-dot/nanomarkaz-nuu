import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.news.deleteMany();
  await prisma.lab.deleteMany();

  await prisma.lab.createMany({
    data: [
      {
        slug: "nanophysics-complex-structures",
        nameUz: "Murakkab tuzilmalar nanofizikasi laboratoriyasi",
        nameRu: "Лаборатория нанофизики сложных структур",
        nameEn: "Nanophysics of Complex Structures Laboratory",
        headUz: "Jamshid Kenja Avloni",
        headRu: "Джамшид Кенжа Авлони",
        headEn: "Jamshid Kenja Avloni",
        descriptionUz:
          "Laboratoriya murakkab nanostrukturalarning fizik xossalari, spintronika va past o‘lchamli tizimlarda elektron tashish jarayonlarini tadqiq qiladi.",
        descriptionRu:
          "Лаборатория исследует физические свойства сложных наноструктур, спинтронику и процессы переноса электронов в низкоразмерных системах.",
        descriptionEn:
          "The laboratory investigates physical properties of complex nanostructures, spintronics, and electron transport in low-dimensional systems.",
      },
      {
        slug: "quantum-photonics",
        nameUz: "Kvant fotonikasi laboratoriyasi",
        nameRu: "Лаборатория квантовой фотоники",
        nameEn: "Quantum Photonics Laboratory",
        headUz: "Odil Ochilov",
        headRu: "Одил Очилов",
        headEn: "Odil Ochilov",
        descriptionUz:
          "Kvant yorug‘lik manbalari, fotonik kristallar va nanooptika yo‘nalishlarida fundamental hamda amaliy tadqiqotlar olib boriladi.",
        descriptionRu:
          "Проводятся фундаментальные и прикладные исследования квантовых источников света, фотонных кристаллов и нанооптики.",
        descriptionEn:
          "The lab conducts fundamental and applied research on quantum light sources, photonic crystals, and nano-optics.",
      },
      {
        slug: "functional-nanomaterials",
        nameUz: "Funksional nanomateriallar laboratoriyasi",
        nameRu: "Лаборатория функциональных наноматериалов",
        nameEn: "Functional Nanomaterials Laboratory",
        headUz: "Prof. Shavkat Uzgenovich Yuldashev",
        headRu: "Проф. Шавкат Узгенович Юлдашев",
        headEn: "Prof. Shavkat Uzgenovich Yuldashev",
        descriptionUz:
          "Yangi avlod funksional nanomateriallar, yarimo‘tkazgich nanostrukturalar va ularning optik-elektron xossalarini sintez qilish va o‘rganish.",
        descriptionRu:
          "Синтез и изучение функциональных наноматериалов нового поколения, полупроводниковых наноструктур и их оптико-электронных свойств.",
        descriptionEn:
          "Synthesis and study of next-generation functional nanomaterials, semiconductor nanostructures, and their optoelectronic properties.",
      },
      {
        slug: "nanothermoelectrics",
        nameUz: "Nanotermoelektrika laboratoriyasi",
        nameRu: "Лаборатория нанотермоэлектричества",
        nameEn: "Nanothermoelectrics Laboratory",
        headUz: "Ulug‘bek Alisherovich Shaislamov",
        headRu: "Улугбек Алишерович Шаисламов",
        headEn: "Ulugbek Alisherovich Shaislamov",
        descriptionUz:
          "Nanostrukturali termoelektrik materiallar, issiqlik-elektr o‘tkazuvchanlik va energiya samarador qurilmalarni ishlab chiqish.",
        descriptionRu:
          "Разработка наноструктурированных термоэлектрических материалов, исследование тепло- и электропроводности и энергоэффективных устройств.",
        descriptionEn:
          "Development of nanostructured thermoelectric materials, heat–electric transport studies, and energy-efficient devices.",
      },
    ],
  });

  const featuredImage =
    "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1600&q=80";
  const labImage =
    "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1600&q=80";

  await prisma.news.createMany({
    data: [
      {
        language: "uz",
        date: new Date("2024-03-30"),
        title: "Thermo Scientific Apreo ChemiSEM skanerlovchi elektron mikroskopi",
        imageUrl: featuredImage,
        content:
          "Markaz ilmiy-tadqiqot imkoniyatlarini kengaytirish maqsadida Thermo Scientific Apreo ChemiSEM skanerlovchi elektron mikroskopini ishga tushirdi. Ushbu jihoz nanostrukturalarning yuqori aniqlikdagi tasvirini olish, element tarkibini tahlil qilish va materialshunoslik tadqiqotlarini yangi bosqichga olib chiqish imkonini beradi.\n\nApreo ChemiSEM tizimi olimlar va doktorantlarga nanoo‘lchamdagi ob’yektlarni real vaqtda o‘rganish, sirt morfologiyasini tahlil qilish hamda xalqaro hamkorlikdagi loyihalarni yuqori sifatda bajarish uchun zamonaviy platforma yaratadi.",
      },
      {
        language: "ru",
        date: new Date("2024-03-30"),
        title: "Сканирующий электронный микроскоп Thermo Scientific Apreo ChemiSEM",
        imageUrl: featuredImage,
        content:
          "Для расширения исследовательских возможностей центр ввёл в эксплуатацию сканирующий электронный микроскоп Thermo Scientific Apreo ChemiSEM. Прибор позволяет получать изображения наноструктур с высоким разрешением, анализировать элементный состав и выводить материаловедческие исследования на новый уровень.\n\nСистема Apreo ChemiSEM создаёт современную платформу для учёных и докторантов: изучение нанообъектов в реальном времени, анализ морфологии поверхности и качественное выполнение международных проектов.",
      },
      {
        language: "en",
        date: new Date("2024-03-30"),
        title: "Thermo Scientific Apreo ChemiSEM scanning electron microscope",
        imageUrl: featuredImage,
        content:
          "To expand its research capacity, the center commissioned a Thermo Scientific Apreo ChemiSEM scanning electron microscope. The instrument enables high-resolution imaging of nanostructures, elemental analysis, and a new level of materials-science research.\n\nApreo ChemiSEM provides scientists and doctoral students with a modern platform for real-time study of nanoscale objects, surface morphology analysis, and high-quality international collaboration.",
      },
      {
        language: "uz",
        date: new Date("2024-08-20"),
        title: "Nanotexnologiyalarni rivojlantirish markazining asosiy vazifalari",
        imageUrl: labImage,
        content:
          "Markaz O‘zbekiston Respublikasi Vazirlar Mahkamasining tegishli qarorlari asosida tashkil etilgan bo‘lib, nanotexnologiya sohasida fundamental va amaliy tadqiqotlarni olib boradi, xorijiy oliy ta’lim va ilmiy muassasalar bilan hamkorlikni rivojlantiradi, mutaxassislar malakasini oshirish va xalqaro konferensiyalarni tashkil etadi.\n\nIlm-fanni ta’lim jarayoni bilan uyg‘unlashtirish — bakalavriat, magistratura va PhD talabalari uchun zamonaviy laboratoriya bazasini taqdim etish markazning ustuvor yo‘nalishlaridan biridir.",
      },
      {
        language: "ru",
        date: new Date("2024-08-20"),
        title: "Основные задачи Центра развития нанотехнологий",
        imageUrl: labImage,
        content:
          "Центр создан на основании соответствующих постановлений Кабинета Министров Республики Узбекистан. Он проводит фундаментальные и прикладные исследования в области нанотехнологий, развивает сотрудничество с зарубежными вузами и научными организациями, повышает квалификацию специалистов и организует международные конференции.\n\nИнтеграция науки и образования — предоставление современной лабораторной базы студентам бакалавриата, магистратуры и PhD — является одним из приоритетов центра.",
      },
      {
        language: "en",
        date: new Date("2024-08-20"),
        title: "Core missions of the Center for the Development of Nanotechnologies",
        imageUrl: labImage,
        content:
          "The center was established under relevant resolutions of the Cabinet of Ministers of the Republic of Uzbekistan. It conducts fundamental and applied research in nanotechnology, develops cooperation with foreign universities and research institutions, upgrades specialist skills, and organizes international conferences.\n\nIntegrating science with education — providing a modern laboratory base for bachelor’s, master’s, and PhD students — is one of the center’s priorities.",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
