export default function AboutPage() {
  return (
    <main className="min-h-screen py-20 px-6" dir="rtl">
      <div className="max-w-3xl mx-auto">

        {/* Title */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest text-amber-600 mb-3">הכירו אותנו</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">עלינו</h1>
          <div className="h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent max-w-24 mx-auto" />
        </div>

        {/* Owner card */}
        <div className="bg-white rounded-3xl border border-amber-100 shadow-sm p-10 flex flex-col md:flex-row gap-10 items-center mb-12">
          {/* Photo placeholder */}
          <div className="flex-shrink-0">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center border-4 border-amber-300">
              <span className="text-6xl">👤</span>
            </div>
          </div>

          {/* Info */}
          <div className="text-right flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">שם בעל העסק</h2>
            <p className="text-amber-600 font-semibold mb-4">מייסד ומנכ&quot;ל TURBI</p>
            <p className="text-gray-600 leading-relaxed mb-6">
              כאן יופיע תיאור קצר על בעל העסק — הרקע המקצועי שלו, הניסיון, הסיפור מאחורי המוצר ולמה הוא הקים את TURBI. טקסט זה ישמש כדמו עד לעדכון הפרטים האמיתיים.
            </p>

            {/* Contact details */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-700">
                <span className="text-xl">📞</span>
                <span className="font-medium">050-000-0000</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <span className="text-xl">📧</span>
                <span className="font-medium">contact@turbi.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <span className="text-xl">📍</span>
                <span className="font-medium">תל אביב, ישראל</span>
              </div>
            </div>
          </div>
        </div>

        {/* Story */}
        <div className="bg-white rounded-3xl border border-amber-100 shadow-sm p-10">
          <h3 className="text-xl font-bold text-gray-900 mb-4">הסיפור שלנו</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            TURBI נוסדה מתוך רצון אמיתי לעזור לאנשים למצוא דרך טבעית ואפקטיבית לשיפור איכות חייהם. לאחר שנים של מחקר ופיתוח, יצרנו ערכה טיפולית ייחודית שמשלבת את הטוב ביותר מהרפואה הטבעית.
          </p>
          <p className="text-gray-600 leading-relaxed">
            אנו מאמינים שכל אדם ראוי לגישה לפתרונות בריאות מקצועיים, ובכך אנו ממשיכים לפתח ולשפר את המוצרים שלנו יום אחר יום.
          </p>
        </div>

      </div>
    </main>
  );
}
