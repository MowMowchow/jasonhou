import "../styles/globals.css";
import Nav from "./client/nav";
import Providers from "./redux/provider";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        <Providers>
          <div className="mx-10 grid grid-cols-1">
            <Nav />
            {children}
          </div>
        </Providers>
      </body>
      {/* <body>{children}</body> */}
    </html>
  );
}
