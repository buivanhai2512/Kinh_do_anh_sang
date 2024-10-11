"use client";
import Banner from "./_components/Banner";
import Content from "./_components/Conten";
import Service from "./_components/Service";

export default function Home() {
  return (
    <div className="container-full">
      {/* banner */}
      <Banner />
      {/* banner */}
      {/* dịch vụ */}
      <Service />
      <Content/>
      {/* dịch vụ */}
    </div>
  );
}
