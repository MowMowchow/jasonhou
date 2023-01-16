import "../styles/globals.css";
import Nav from "./client/nav";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        <div className="mx-10 grid grid-cols-1">
          <Nav />

          {children}
        </div>
      </body>
      {/* <body>{children}</body> */}
    </html>
  );
}
