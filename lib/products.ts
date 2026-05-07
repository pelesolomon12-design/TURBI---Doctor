export type Product = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number; // in agorot (ILS cents)
  originalPrice?: number;
  shipping: number;
  features: string[];
  includes: string[];
};

export const mainProduct: Product = {
  id: "therapeutic-kit",
  name: "הערכה הטיפולית",
  tagline: "הדרך הטבעית לאיזון, רגיעה והחלמה",
  description:
    "ערכה טיפולית מקצועית שפותחה בקפידה על ידי מומחים, המשלבת את הטוב ביותר מהרפואה הטבעית. מיועדת לכל מי שמחפש דרך אפקטיבית לשפר את איכות חייו.",
  price: 29900, // 299 ₪
  originalPrice: 39900, // 399 ₪
  shipping: 2900, // 29 ₪
  features: [
    "פורמולה ייחודית מבוססת מחקר",
    "מרכיבים טבעיים בלבד",
    "תוצאות מורגשות תוך 30 יום",
    "מאושר על ידי מומחים",
  ],
  includes: [
    "מוצר עיקרי × 1",
    "מדריך שימוש מקצועי",
    "תכנית טיפול אישית",
    "ליווי מקצועי 30 יום",
  ],
};

export function formatPrice(cents: number): string {
  return `₪${(cents / 100).toFixed(0)}`;
}
