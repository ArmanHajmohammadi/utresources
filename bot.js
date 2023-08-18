// ############# Defining and importing #############
// adding dotenv
require("dotenv").config();
// importing the needed libraries:
const { Telegraf } = require("telegraf");

// defining the bot and give it the token:
const token = process.env.BOT_TOKEN;
const bot = new Telegraf(token);

// holding the current circumstance of the keyboard and menu:
//   circumstances:
//     main_menu
//     send_major
//     major_result
//     book_name
//     course_name
//     description
//     file
let usersInfo = {
  chatID: {
    menu: "main_menu",
    major: "",
    course: "",
    description: "",
    book: "",
    result: "",
  },
};

// keyboard buttons:
const backButton = "◀️ بازگشت";
const sendButton = "📚 ارسال جزوه یا کتاب";
const UTSocietyButton = "🏛 جامعه ی دانشگاه تهران";
const UTPostsButton = "🗒 مطالب مفید";

// keyboards:
const mainKeyboard = [
  [sendButton],
  ["💳 حمایت"],
  [UTSocietyButton, UTPostsButton],
];

const backKeyboard = [[backButton]];
// ################## Functions ###################
function containsAbusiveWords(text) {
  text = text.replace(" ", "");
  text = text.replace("*", "");
  text = text.replace("/", "");
  text = text.replace("+", "");
  text = text.replace("-", "");
  text = text.replace(".", "");
  text = text.replace("|", "");
  text = text.replace("$", "");
  text = text.replace("%", "");
  text = text.replace("_", "");
  text = text.replace("#", "");
  text = text.replace("@", "");
  text = text.replace("!", "");
  text = text.replace(",", "");
  text = text.replace("÷", "");
  text = text.replace("×", "");
  text = text.replace("`", "");
  text = text.replace("\n", "");
  text = text.replace("\t", "");
  text = text.replace("َ", "");
  text = text.replace("ُ", "");
  text = text.replace("ِ", "");
  text = text.replace("ّ", "");
  text = text.replace("ۀ", "");
  text = text.replace("ً", "");
  text = text.replace("ٌ", "");
  text = text.replace("ٍ", "");
  text = text.replace("‌", "");
  text = text.replace("1", "");
  text = text.replace("2", "");
  text = text.replace("3", "");
  text = text.replace("4", "");
  text = text.replace("5", "");
  text = text.replace("6", "");
  text = text.replace("7", "");
  text = text.replace("8", "");
  text = text.replace("9", "");
  text = text.replace("0", "");
  const abusiveWords = [
    "@",
    "کسنن",
    "کصنن",
    "کسخوار",
    "کصخوار",
    "کسخار",
    "کصخار",
    "خوارکصده",
    "خارکصده",
    "خوارکسده",
    "خارکسده",
    "خوارکصه",
    "خوارکسه",
    "خارکصه",
    "خارکسه",
    "کصکش",
    "کسکش",
    "جنده",
    "جندگی",
    "گایید",
    "ننتو",
    "کیرم",
    "تخمم",
    "پتیاره",
    "مادرتو",
    "کیری",
    "کسشر",
    "کسوشر",
    "کصشر",
    "کصوشر",
    "کسشعر",
    "کسوشعر",
    "کصوشعر",
    "کصشعر",
    "تخم",
    "کیر",
    "kosekhar",
    "kosnan",
    "kosenan",
    "kharkos",
    "gayid",
    "jende",
    "madarjend",
    "tokhmam",
    "kiram",
    "koskesh",
    "gohnakhor",
    "nanato",
    "madareto",
    "petiyare",
    "petiare",
    "tkhmm",
    "jnde",
    "mdreto",
    "kososher",
    "kosesher",
    "kssher",
    "kossher",
    "kos",
    "جاکش",
    "گوه",
    "مادرخراب",
    "fuck",
    "کصبیبی",
  ];
  for (const word of abusiveWords) {
    if (text.toLowerCase().includes(word)) {
      console.log("The comment containes abusive word: " + word);
      return true;
    }
  }

  return false;
}

function searchMajor(input) {
  const majors = [
    "زبان اردو",
    "زبان چینی",
    "زبان فرانسه",
    "زبان ژاپنی",
    "زبان انگلیسی",
    "زبان ایتالیایی",
    "زبان اسپانیایی",
    "ادبیات عرب",
    "مترجمی عربی",
    "ادبیات فارسی",
    "تاریخ",
    "فلسفه",
    "باستان شناسی",
    "اقتصاد",
    "علوم سیاسی",
    "حقوق",
    "روانشناسی",
    "علوم تربیتی",
    "پزشکی",
    "دندان پزشکی",
    "دامپزشکی",
    "داروسازی",
    "فیزیوتراپی",
    "گفتار درمانی",
    "علوم آزمایشگاهی",
    "مهندسی بهداشت و محیط",
    "ساخت پروتز های دندانی",
    "پرستاری",
    "مامایی",
    "رادیولوژی",
    "اتاق عمل",
    "مهندسی برق",
    "مهندسی پلیمر",
    "مهندسی صنایع",
    "مهندسی شیمی",
    "مهندسی عمران",
    "مهندسی کامپیوتر",
    "مهندسی معدن",
    "مهندسی مکانیک",
    "مهندسی مواد و متالورژی",
    "مهندسی نفت",
    "مهندسی نقشه برداری",
    "علوم مهندسی",
    "مهندسی معماری",
    "مهندسی شهرسازی",
    "طراحی صنعتی",
    "مجسمه سازی",
    "هنر های نمایشی",
    "عکاسی",
    "ادبیات نمایشی",
    "نوازندگی موسیقی ایرانی و جهانی",
    "علوم کامپیوتر",
    "ریاضی ",
    "شیمی",
    "فیزیک ",
    "آمار",
    "زیست سلولی",
    "زیست جانوری",
    "زمین شناسی",
    "زیست فناوری",
    "زیست میکروبی",
    "زیست گیاهی",
    "برنامه‌ریزی اجتماعی و تعاون",
    "جامعه‌شناسی",
    "علوم ارتباطات اجتماعی",
    "مردم‌شناسی",
    "مهندسي فضاي سبز",
    "مهندسی صنایع چوب و مبلمان",
    "مهندسی گیاهپزشکی",
    "مهندسی خاک",
    "علوم مهندسی شیلات ",
    "مهندسی تولید و ژنتیک گیاهی",
    "مهندسی مکانیک بیوسیستم",
    "مهندسی منابع طبیعی",
    "مهندسی طبیعت",
    "علوم و مهندسی محیط زیست",
    "صنایع غذایی",
    "جغرافیا",
    "مدیریت مالی",
    "حسابداری",
    "مدیریت بازرگانی",
    "مدیریت دولتی",
    "مدیریت صنعتی",
    "فقه و مبانی حقوق اسلامی",
    "علوم قرآن و حدیث",
    "فلسفه و حکمت اسلامی",
    "ادیان و عرفان اسلامی",
    "فقه شافعی",
    "تاریخ و تمدن ملل اسلامی",
    "علوم ورزشی",
  ];
  let result = [];
  majors.forEach((major) => {
    if (major.includes(input)) {
      result.push([major]);
    }
  });
  result.push([backButton]);
  return result;
}

function logger(ctx, process) {
  let log = "";
  if (ctx.from.first_name) {
    log += ctx.from.first_name.toString() + " ";
  }
  if (ctx.from.last_name) {
    log += ctx.from.last_name.toString() + " ";
  }
  if (ctx.from.username) {
    log += " => " + ctx.from.username.toString() + " ";
  }
  if (ctx.chat.id) {
    log += " => " + ctx.chat.id.toString() + " ";
  }
  log += " : " + process;
  console.log(log);
}
// ################## Bot commands ###################
// start command:
bot.start((ctx) => {
  try {
    // reply:
    const options = {
      reply_markup: {
        keyboard: mainKeyboard,
        resize_keyboard: true,
      },
      disable_web_page_preview: true,
      parse_mode: "Markdown",
    };
    bot.telegram.sendMessage(
      ctx.chat.id,
      `
  سلام ${ctx.from.first_name != undefined ? ctx.from.first_name : ""} ${
        ctx.from.last_name != undefined ? ctx.from.last_name : ""
      } ☺️
حالت چطوره؟! امیدوارم کیفت کوک باشه! :)
اینجا میتونی جزوه‌ و کتاب‌هایی که در اختیار داری رو برای من بفرستی تا من توی [کانال منابع دانشگاه تهران](https://t.me/UTResources) قرارشون بدم و بقیه هم ازشون استفاده کنن 😇 
اگر هم سوالی داشتی، سوالت رو حتما توی [گروه دانشگاه تهران](t.me/UTGroups) بپرس. اونجا دانشجوهای دیگه حضور دارن و حتما راهنماییت میکنن 😌
موفق باشی ✌️`,
      options
    );

    // log:
    logger(ctx, "Started the bot.");
    // saving the mode:
    if (!usersInfo[ctx.chat.id]) {
      usersInfo[ctx.chat.id] = {
        menu: "main_menu",
        major: "",
        course: "",
        description: "",
        book: "",
      };
    }
    usersInfo[ctx.chat.id].menu = "main_menu";
  } catch (error) {
    console.error(error);
  }
});

// Sending an index of the posts of the ut guide channel:
bot.hears(UTPostsButton, (ctx) => {
  try {
    if (!usersInfo[ctx.chat.id]) {
      usersInfo[ctx.chat.id] = {
        menu: "main_menu",
        major: "",
        course: "",
        description: "",

        book: "",
      };
    }
    if (usersInfo[ctx.chat.id].menu == "main_menu") {
      const options = {
        reply_markup: { keyboard: mainKeyboard, resize_keyboard: true },
        disable_web_page_preview: true,
        parse_mode: "Markdown",
      };
      bot.telegram.sendMessage(
        ctx.chat.id,
        `
لینک ها:
⭕️ [لیست سامانه های مهم دانشگاه](https://t.me/UT_Guide/16)
⭕️ [کانال های تلگرامی دانلود کتاب دانشگاهی](https://t.me/UT_Guide/65)

دانستنی‌ها:
💡 [کهاد چیه؟](https://t.me/UT_Guide/19)
💡 [دو وجهی چیه؟](https://t.me/UT_Guide/22)
💡 [دو رشته ای چیه؟](https://t.me/UT_Guide/24)
💡[تغییر رشته در مقطع کارشناسی؟](https://t.me/UT_Guide/26)

اندک ترم‌ای‌ها:
🔺 [قسمت اول](https://t.me/UT_Guide/60) (گلستان، ایلرن، کلاس آنلاین)
🔺 [قسمت دوم](https://t.me/UT_Guide/62) (ایمیل دانشگاه، تی ای)
🔺 [قسمت سوم](https://t.me/UT_Guide/66) (معرفی دانشکده ادبیات)
🔺 [قسمت چهارم](https://t.me/UT_Guide/67) (معرفی پردیس فنی)
🔺 [قسمت پنجم](https://t.me/UT_Guide/69) (المپیاد دانشجویی)
🔺 [قسمت ششم](https://t.me/UT_Guide/70) (خوابگاه کارشناسی)
🔺 [قسمت هفتم](https://t.me/UT_Guide/79) (ریاضی یک)
🔺 [قسمت هشتم](https://t.me/UT_Guide/82) (فیزیک یک)
🔺 [قسمت نهم](https://t.me/UT_Guide/83) (خرید کتب دانشگاهی)
🔺 [قسمت دهم](https://t.me/UTCivGuide/108) (ریاضی دو)
🔺 [قسمت یازدهم](https://t.me/UTCivGuide/120) (معادلات دیفرانسیل)
🔺 [قسمت دوازدهم](https://t.me/UTCivGuide/127) (فیزیک دو)

🔶 به درد بخور ها:
🔸 [دفتر تلفن دانشگاه تهران](https://t.me/UT_Guide/33)
🔸 [نرم افزار دانشگاه تهران](https://t.me/UT_Guide/53)
🔸 [نحوه ی ورود به سامانه گلستان](https://t.me/UT_Guide/45)
🔸 [لیست گزارش های مهم سامانه گلستان](https://t.me/UT_Guide/59)
🔸 [توضیح در مورد کارگاه مهارت های زندگی](https://t.me/UT_Guide/77)
🔸 [اطلاعیه کارگاه مهارت های زندگی](https://t.me/UT_Guide/85)
🔸 [اتصال ایمیل دانشگاهی به نرم افزار ایمیل](https://t.me/UT_Guide/76)
🔸 [رفع مشکل میکروفون و وبکم در کلاس آنلاین](https://t.me/UT_Guide/84)
🔸 [نرم افزار های اسکن و ادغام PDF](https://t.me/UT_Guide/36)
  `,
        options
      );
      // log:
      logger(ctx, "got  the UT posts.");
      if (!usersInfo[ctx.chat.id]) {
        usersInfo[ctx.chat.id] = {};
      }
      usersInfo[ctx.chat.id].menu = "main_menu";
    }
  } catch (error) {
    console.error(error);
  }
});

// Sending the ccomplete list of the ut groups:
bot.hears(UTSocietyButton, (ctx) => {
  try {
    if (!usersInfo[ctx.chat.id]) {
      usersInfo[ctx.chat.id] = {
        menu: "main_menu",
        major: "",
        course: "",
        description: "",

        book: "",
      };
    }
    if (usersInfo[ctx.chat.id].menu == "main_menu") {
      const options = {
        reply_markup: { keyboard: mainKeyboard, resize_keyboard: true },
        disable_web_page_preview: true,
        parse_mode: "Markdown",
      };
      bot.telegram.sendMessage(
        ctx.chat.id,
        `
💢 [گروه دانشگاه تهران](t.me/UTGroups)

💡 گروه های رفع اشکال :
🌀 [ریاضیات دانشگاه تهران](https://t.me/fannimath) 
🌀 [فیزیک دانشگاه تهران](https://t.me/fanniphysics) 
🌀 [شیمی دانشگاه تهران](https://t.me/fannichem)
🌀 [برنامه نویسی دانشگاه تهران](https://t.me/ut_Debugger) 
🌀 [رفع اشکال مهندسی برق](https://t.me/EE_Students)

📢 کانال های دانشگاه تهران (همه ی رشته ها) : 
♦️ [راهنمای دانشگاه تهران](t.me/UT_guide)
♦️ [اشیا گمشده دانشگاه تهران](t.me/ut_lostfound)
♦️ [اساتید دانشگاه تهران](t.me/UTeacherz)
♦️ [کوی ستان](https://t.me/Kooyestan)
♦️ [همیار (بسیج) دانشگاه تهران](https://t.me/hamyarUT)
♦️ [کانال ut.ac](https://t.me/ut_ac)
♦️ [انتخاب واحد دانشگاه تهران](https://t.me/Evahed_UT) 

📢 کانال های اطلاع رسانی دانشگاه تهران (مخصوص فنی - مهندسی) : 
♦️ [آرشیو فیلم های دروس پایه دانشگاه تهران](http://t.me/OCpaye_98)
♦️ [کانال ECETrends](t.me/ecetrends)
♦️ [فنی یار](https://t.me/TVUniversity)
♦️ [صراط](https://t.me/utserat) 
♦️ [حکیم](https://t.me/hakim96_ut) 

📺 کانال ها و گروه های متفرقه(تفریحی) : 
🌀 [زایشگاه تهران](https://t.me/ZayeshgahTehran)
🌀 [یوتی موویز](https://t.me/utmovies)
🌀 [یوتی میوزیک ۱](https://t.me/UT_musics)
🌀 [یوتی میوزیک ۲](https://t.me/utmusics)
🌀 [اوتاکو (گروه انیمه)](https://t.me/UT_Otakus)
🌀 [گروه شعر و ادبیات دانشگاه تهران](https://t.me/ut_poem_group)

غیر ضروری:
🔸 [گروه کد فراموشی غذا](https://t.me/+RGMB1KZyhlZxTYd9)
🔸 [گروه کهاد دانشگاه تهران](https://t.me/+U2iPesX2LUgvrv-M)
🔸 [ورزشکاران دانشکده فنی](https://t.me/varzesh_fanni)
🔸 [معاونت فرهنگی فنی](https://t.me/engcultural_ut)
🔸 [باشگاه دانشجویان](https://t.me/utstudentsunion)
🔸 [کانال دانشگاه تهران دانشجو](https://t.me/daneshjo_ut)
🔸 [کتابخانه مرکزی دانشگاه تهران](https://t.me/UT_Central_Library)
🔸 [موسسه انتشارات دانشگاه تهران](https://t.me/UniversityofTehranPress)
🔸 [مرکز مشاوره دانشگاه تهران](https://t.me/UTcounseling)
🔸 [ورک شاپ دانشگاه تهران](https://t.me/UTworkshops)
🔸 [شورای صنفی کل دانشجویان دانشگاه تهران](https://t.me/UT_SENFI)
🔸 [سپیدار (بسیج دانشجویی دانشگاه تهران)](https://t.me/sepidar_ut)
🔸 [جامعه اسلامی دانشگاه تهران](https://t.me/JAD_ut)
🔸 [آرمان دانشگاه تهران](https://t.me/ut_edalatkhahi)
🔸 [دانشگاه تهران (نیوزلاین)](https://t.me/UT_NEWSLINE)
🔸 [كانال خوابگاه دانشگاه](https://t.me/khabgahut)
  `,
        options
      );
      // log:
      logger(ctx, "got the ut society links.");
      if (!usersInfo[ctx.chat.id]) {
        usersInfo[ctx.chat.id] = {};
      }
      usersInfo[ctx.chat.id].menu = "main_menu";
    }
  } catch (error) {
    console.error(error);
  }
});

// Donate link:
bot.hears("💳 حمایت", (ctx) => {
  try {
    if (!usersInfo[ctx.chat.id]) {
      usersInfo[ctx.chat.id] = {
        menu: "main_menu",
        major: "",
        course: "",
        description: "",

        book: "",
      };
    }
    if (usersInfo[ctx.chat.id].menu == "main_menu") {
      if (usersInfo[ctx.chat.id] == undefined) {
        usersInfo[ctx.chat.id] = {};
      }
      const options = {
        reply_markup: { keyboard: mainKeyboard, resize_keyboard: true },
        disable_web_page_preview: true,
        parse_mode: "Markdown",
      };
      bot.telegram.sendMessage(
        ctx.chat.id,
        `ممنونم از اینکه تصمیم گرفتی ما رو حمایت کنی 😊
برای حمایت روی [این لینک](https://zarinp.al/armanium) کلیک کن ❤️
اگرم لینک باز نشد، بی‌زحمت VPNات رو خاموش کن 😍`,
        options
      );
      console.log(
        ctx.from.username
          ? ctx.from.username.toString() + " wants to donate"
          : ctx.chat.id.toString() + " wants to donate"
      );
      if (!usersInfo[ctx.chat.id]) {
        usersInfo[ctx.chat.id] = {};
      }
      usersInfo[ctx.chat.id].menu = "main_menu";
    }
  } catch (error) {
    console.error(error);
  }
});

// Searching for a professor:
bot.hears(sendButton, (ctx) => {
  try {
    if (!usersInfo[ctx.chat.id]) {
      usersInfo[ctx.chat.id] = {
        menu: "main_menu",
        major: "",
        course: "",
        description: "",

        book: "",
      };
    }
    if (usersInfo[ctx.chat.id].menu == "main_menu") {
      // reply:
      const options = {
        reply_markup: {
          keyboard: backKeyboard,
          resize_keyboard: true,
        },
        disable_web_page_preview: true,
        parse_mode: "Markdown",
      };
      bot.telegram.sendMessage(ctx.chat.id, "چه رشته‌ای هستی؟!", options);
      // log:
      logger(ctx, "pressed the send buttton.");
      // saving the mode:
      if (!usersInfo[ctx.chat.id]) {
        usersInfo[ctx.chat.id] = {};
      }
      usersInfo[ctx.chat.id].menu = "send_major";
    }
  } catch (error) {
    console.error(error);
  }
});

// going one page back in the menu:
bot.hears(backButton, (ctx) => {
  try {
    if (!usersInfo[ctx.chat.id]) {
      usersInfo[ctx.chat.id] = {
        menu: "main_menu",
        major: "",
        course: "",
        description: "",

        book: "",
      };
    }
    let options = {};
    let text = "";
    //     send_major
    //     major_result
    //     book_name
    //     course_name
    //     description
    //     file
    switch (usersInfo[ctx.chat.id].menu) {
      case "send_major":
        // reply:
        options = {
          reply_markup: {
            keyboard: mainKeyboard,
            resize_keyboard: true,
          },
          disable_web_page_preview: true,
          parse_mode: "Markdown",
        };

        text = `چه کاری می‌تونم برات انجام بدم؟`;

        // log:
        logger(ctx, "got back from send_major.");
        // saving the mode:

        usersInfo[ctx.chat.id].menu = "main_menu";
        break;
      case "major_result":
        // reply:
        options = {
          reply_markup: {
            keyboard: backKeyboard,
            resize_keyboard: true,
          },
          disable_web_page_preview: true,
          parse_mode: "Markdown",
        };
        text = "چه رشته‌ای هستی؟!";
        // log:
        logger(ctx, "pressed the send buttton.");
        // saving the mode:
        if (!usersInfo[ctx.chat.id]) {
          usersInfo[ctx.chat.id] = {};
        }
        usersInfo[ctx.chat.id].menu = "send_major";
        break;
      case "book_name":
        options = {
          reply_markup: {
            keyboard: usersInfo[ctx.chat.id].result,
            resize_keyboard: true,
          },
        };
        text = `از بین نتایج جست‌ و جو، رشته‌ی مد نظرت رو انتخاب کن:`;
        usersInfo[ctx.chat.id].menu = "major_result";
        break;
      case "course_name":
        options = {
          reply_markup: {
            keyboard: backKeyboard,
            resize_keyboard: true,
          },
        };
        text = `اسم کتاب چیه؟`;
        usersInfo[ctx.chat.id].menu = "book_name";
        break;
      case "description":
        options = {
          reply_markup: {
            keyboard: backKeyboard,
            resize_keyboard: true,
          },
        };
        bot.telegram.sendMessage(
          ctx.chat.id,
          "جزوه یا کتاب متعلق به چه درسی هست؟",
          options
        );
        usersInfo[ctx.chat.id].menu = "course_name";
        break;
      case "file":
        options = {
          reply_markup: {
            keyboard: backKeyboard,
            resize_keyboard: true,
          },
        };
        text =
          "میتونی توضیحات بیشتری در مورد کتاب یا جزوه اضافه کنی؟(مثلاً اسم گردآورنده یا مولف و...)";
        usersInfo[ctx.chat.id].menu = "description";
        break;
      default:
        options = {
          reply_markup: {
            keyboard: mainKeyboard,
            resize_keyboard: true,
          },
        };
        text = `متوجه نشدم! چه کاری برات انجام بدم؟!`;

        usersInfo[ctx.chat.id].menu = "main_menu";
        break;
    }
    bot.telegram.sendMessage(ctx.chat.id, text, options);
  } catch (error) {
    console.error(error);
  }
});

// receive any text:
bot.hears(/.*/, (ctx) => {
  try {
    if (!usersInfo[ctx.chat.id]) {
      usersInfo[ctx.chat.id] = {
        menu: "main_menu",
        major: "",
        course: "",
        description: "",

        book: "",
      };
    }
    switch (usersInfo[ctx.chat.id].menu) {
      case "send_major":
        if (ctx.message.text.length < 4) {
          const options = {
            reply_markup: {
              keyboard: backKeyboard,
              resize_keyboard: true,
            },
          };
          bot.telegram.sendMessage(
            ctx.chat.id,
            `اسم رشتت نمی‌تونه کمتر از ۴ کاراکتر باشه...`,
            options
          );
          usersInfo[ctx.chat.id].menu = "send_major";
        } else if (/[a-zA-Z]/.test(ctx.message.text)) {
          const options = {
            reply_markup: {
              keyboard: backKeyboard,
              resize_keyboard: true,
            },
          };
          bot.telegram.sendMessage(
            ctx.chat.id,
            `اسم رشتت نمیتونه شامل حروف انگلیسی باشه. لطفاً اسم رشتت رو تماماً فارسی تایپ کن :)`,
            options
          );
          usersInfo[ctx.chat.id].menu = "send_major";
        } else {
          usersInfo[ctx.chat.id].result = searchMajor(ctx.message.text);
          if (usersInfo[ctx.chat.id].result.length > 1) {
            const options = {
              reply_markup: {
                keyboard: usersInfo[ctx.chat.id].result,
                resize_keyboard: true,
              },
            };
            bot.telegram.sendMessage(
              ctx.chat.id,
              `از بین نتایج جست‌ و جو، رشته‌ی مد نظرت رو انتخاب کن:`,
              options
            );
            usersInfo[ctx.chat.id].menu = "major_result";
          } else {
            const options = {
              reply_markup: {
                keyboard: backKeyboard,
                resize_keyboard: true,
              },
            };
            bot.telegram.sendMessage(
              ctx.chat.id,
              `متاسفانه رشته‌ای با این اسم پیدا نکردم. میتونی یه بار دیگه اسم رشتت رو بهم بگی؟`,
              options
            );
            usersInfo[ctx.chat.id].menu = "send_major";
          }
        }
        break;
      case "major_result":
        if (ctx.message.text.length < 4) {
          const options = {
            reply_markup: {
              keyboard: backKeyboard,
              resize_keyboard: true,
            },
          };
          bot.telegram.sendMessage(
            ctx.chat.id,
            `اسم رشتت نمی‌تونه کمتر از ۴ کاراکتر باشه...`,
            options
          );
          usersInfo[ctx.chat.id].menu = "send_major";
        } else if (/[a-zA-Z]/.test(ctx.message.text)) {
          const options = {
            reply_markup: {
              keyboard: backKeyboard,
              resize_keyboard: true,
            },
          };
          bot.telegram.sendMessage(
            ctx.chat.id,
            `اسم رشتت نمیتونه شامل حروف انگلیسی باشه. لطفاً اسم رشتت رو تماماً فارسی تایپ کن :)`,
            options
          );
          usersInfo[ctx.chat.id].menu = "send_major";
        } else {
          usersInfo[ctx.chat.id].result.forEach((element) => {
            if (element == ctx.message.text) {
              usersInfo[ctx.chat.id].result = element;
              return;
            }
          });
          if (usersInfo[ctx.chat.id].result.length == 1) {
            usersInfo[ctx.chat.id].major = ctx.message.text;
            const options = {
              reply_markup: {
                keyboard: backKeyboard,
                resize_keyboard: true,
              },
            };
            bot.telegram.sendMessage(ctx.chat.id, `اسم کتاب چیه؟`, options);
            usersInfo[ctx.chat.id].menu = "book_name";
          } else {
            const options = {
              reply_markup: {
                keyboard: backKeyboard,
                resize_keyboard: true,
              },
            };
            bot.telegram.sendMessage(
              ctx.chat.id,
              `متاسفانه رشته‌ای با این اسم پیدا نکردم. میتونی یه بار دیگه اسم رشتت رو بهم بگی؟`,
              options
            );
            usersInfo[ctx.chat.id].menu = "send_major";
          }
        }
        break;
      case "book_name":
        if (ctx.message.text.length < 6) {
          const options = {
            reply_markup: {
              keyboard: backKeyboard,
              resize_keyboard: true,
            },
          };
          bot.telegram.sendMessage(
            ctx.chat.id,
            `اسم کتاب نمی‌تونه کمتر از ۶ کاراکتر باشه...`,
            options
          );
          usersInfo[ctx.chat.id].menu = "book_name";
        } else if (ctx.message.text.length > 50) {
          const options = {
            reply_markup: {
              keyboard: backKeyboard,
              resize_keyboard: true,
            },
          };
          bot.telegram.sendMessage(
            ctx.chat.id,
            `اسم کتاب نمی‌تونه بیشتر از ۵۰ کاراکتر باشه...`,
            options
          );
          usersInfo[ctx.chat.id].menu = "book_name";
        } else if (containsAbusiveWords(ctx.message.text.toString())) {
          const options = {
            reply_markup: {
              keyboard: backKeyboard,
              resize_keyboard: true,
            },
          };
          bot.telegram.sendMessage(
            ctx.chat.id,
            `خیلی بی‌ادبی 😔
این حرفای زشتو از کجا یادگرفتی؟ 😭
لطفاً این‌دفعه مودبانه اسم کتاب رو بهم بگو...`,
            options
          );
          usersInfo[ctx.chat.id].menu = "book_name";
        } else {
          usersInfo[ctx.chat.id].book = ctx.message.text;
          const options = {
            reply_markup: {
              keyboard: backKeyboard,
              resize_keyboard: true,
            },
          };
          bot.telegram.sendMessage(
            ctx.chat.id,
            "جزوه یا کتاب متعلق به چه درسی هست؟",
            options
          );
          usersInfo[ctx.chat.id].menu = "course_name";
        }
        break;
      case "course_name":
        if (ctx.message.text.length < 6) {
          const options = {
            reply_markup: {
              keyboard: backKeyboard,
              resize_keyboard: true,
            },
          };
          bot.telegram.sendMessage(
            ctx.chat.id,
            `اسم درس نمی‌تونه کمتر از ۶ کاراکتر باشه...`,
            options
          );
          usersInfo[ctx.chat.id].menu = "course_name";
        } else if (ctx.message.text.length > 50) {
          const options = {
            reply_markup: {
              keyboard: backKeyboard,
              resize_keyboard: true,
            },
          };
          bot.telegram.sendMessage(
            ctx.chat.id,
            `اسم درس نمی‌تونه بیشتر از ۵۰ کاراکتر باشه...`,
            options
          );
          usersInfo[ctx.chat.id].menu = "course_name";
        } else if (containsAbusiveWords(ctx.message.text.toString())) {
          const options = {
            reply_markup: {
              keyboard: backKeyboard,
              resize_keyboard: true,
            },
          };
          bot.telegram.sendMessage(
            ctx.chat.id,
            `خیلی بی‌ادبی 😔
این حرفای زشتو از کجا یادگرفتی؟ 😭
لطفاً این‌دفعه مودبانه اسم درس رو بهم بگو...`,
            options
          );
          usersInfo[ctx.chat.id].menu = "course_name";
        } else {
          usersInfo[ctx.chat.id].course = ctx.message.text;
          const options = {
            reply_markup: {
              keyboard: backKeyboard,
              resize_keyboard: true,
            },
          };
          bot.telegram.sendMessage(
            ctx.chat.id,
            "میتونی توضیحات بیشتری در مورد کتاب یا جزوه اضافه کنی؟(مثلاً اسم گردآورنده یا مولف و...)",
            options
          );
          usersInfo[ctx.chat.id].menu = "description";
        }
        break;
      case "description":
        if (ctx.message.text.length < 6) {
          const options = {
            reply_markup: {
              keyboard: backKeyboard,
              resize_keyboard: true,
            },
          };
          bot.telegram.sendMessage(
            ctx.chat.id,
            `توضیحاتت نمی‌تونه کمتر از ۶ کاراکتر باشه...`,
            options
          );
          usersInfo[ctx.chat.id].menu = "description";
        } else if (ctx.message.text.length > 250) {
          const options = {
            reply_markup: {
              keyboard: backKeyboard,
              resize_keyboard: true,
            },
          };
          bot.telegram.sendMessage(
            ctx.chat.id,
            `توضیحاتت نمی‌تونه بیشتر از ۲۵۰ کاراکتر باشه...`,
            options
          );
          usersInfo[ctx.chat.id].menu = "description";
        } else if (containsAbusiveWords(ctx.message.text.toString())) {
          const options = {
            reply_markup: {
              keyboard: backKeyboard,
              resize_keyboard: true,
            },
          };
          bot.telegram.sendMessage(
            ctx.chat.id,
            `خیلی بی‌ادبی 😔
این حرفای زشتو از کجا یادگرفتی؟ 😭
لطفاً این‌دفعه مودبانه توضیحاتت رو بهم بگو...`,
            options
          );
          usersInfo[ctx.chat.id].menu = "description";
        } else {
          usersInfo[ctx.chat.id].description = ctx.message.text;
          const options = {
            reply_markup: {
              keyboard: backKeyboard,
              resize_keyboard: true,
            },
          };
          bot.telegram.sendMessage(
            ctx.chat.id,
            "حالا فایل کتاب یا جزوه رو برام بفرست.",
            options
          );
          usersInfo[ctx.chat.id].menu = "file";
        }
        break;
      default:
        options = {
          reply_markup: {
            keyboard: mainKeyboard,
            resize_keyboard: true,
          },
        };
        text = `متوجه نشدم! چه کاری برات انجام بدم؟!`;
        if (!usersInfo[ctx.chat.id]) {
          usersInfo[ctx.chat.id] = {};
        }
        usersInfo[ctx.chat.id].menu = "main_menu";
        break;
    }
  } catch (error) {
    console.error(error);
  }
});

// receiving any document
bot.on("document", async (ctx) => {
  try {
    if (!usersInfo[ctx.chat.id]) {
      usersInfo[ctx.chat.id] = {
        menu: "main_menu",
        major: "",
        course: "",
        description: "",

        book: "",
      };
    }
    if (usersInfo[ctx.chat.id].menu == "file") {
      const document = ctx.message.document;
      const fileType = document.mime_type;
      let type = "";
      if (fileType.includes("pdf")) {
        type = "PDF";
      } else if (
        fileType.includes("msword") ||
        fileType.includes(
          "vnd.openxmlformats-officedocument.wordprocessingml.document"
        )
      ) {
        type = "Word";
      } else if (fileType.includes("zip")) {
        type = "Zip";
      } else if (fileType.includes("excel")) {
        type = "Excel";
      } else if (fileType.includes("powerpoint")) {
        type = "Power Point";
      } else if (fileType.includes("rar")) {
        type = "Rar";
      } else if (fileType.includes("plain")) {
        type = "text";
      } else {
        type = fileType;
      }

      // Posting it in the channel:
      // Add a caption to the document
      const caption = `🧑🏼‍🎓 رشته: ${
        "#" + usersInfo[ctx.chat.id].major.replace(" ", "_")
      }
📝 نام درس: ${usersInfo[ctx.chat.id].course}
📚نام کتاب/جزوه: ${usersInfo[ctx.chat.id].book}
🖊 نوع فایل: ${type}

💢توضیحات: 
${usersInfo[ctx.chat.id].description}

@UTGroups
`;

      // Send the document to the channel with the caption using bot.telegram.sendDocument
      await bot.telegram.copyMessage(
        "@utresources",
        ctx.message.chat.id,
        ctx.message.message_id,
        {
          caption: caption,
        }
      );

      // sending the confirmation message:
      const options = {
        reply_markup: {
          keyboard: mainKeyboard,
          resize_keyboard: true,
        },
        disable_web_page_preview: true,
        parse_mode: "Markdown",
      };
      await bot.telegram.sendMessage(
        ctx.chat.id,
        `ممنون از لطفی که کردی :)
کتاب/جزوه‌ای که برام فرستادی با موفقیت توی کانال، پست شد❤️`,
        options
      );
      // reset the userinfo
      usersInfo[ctx.chat.id] = {
        menu: "main_menu",
        major: "",
        course: "",
        description: "",
        book: "",
      };

      // log:
      logger(ctx, "Sent a book.");
    }
  } catch (error) {
    console.error(error);
  }
});

// launching the bot:
bot.launch();
