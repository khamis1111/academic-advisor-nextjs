import "./globals.css";

export const metadata = {
  title: "نظام الإرشاد الأكاديمي",
  description: "نظام الإرشاد الأكاديمي للطلاب الجامعيين",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl">
      <body className={`antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
