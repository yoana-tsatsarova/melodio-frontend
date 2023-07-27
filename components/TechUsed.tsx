import React from "react";
const Aboutus = () => {
  return (
    <section
      className={`flex flex-col  mx-auto justify-center items-center bg-gray-900 text-gray-100 md:text-4xl text-3xl`}>
      <div className="container mx-auto px-11 text-center py-12">
        <h2>
          <strong>Technologies Used</strong>
        </h2>
        <div className="mt-10 grid grid-cols-5 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-9 gap-6 lg:gap-20">
          <img src="/images/logos/java.svg"/>
          <img src="/images/logos/boot.svg"/>
          <img src="/images/logos/typescript.svg"/>
          <img src="/images/logos/native.svg"/>
          <img src="/images/logos/azure.svg"/>
          <img src="/images/logos/tailwindcss.svg"/>
          <img src="/images/logos/postgresql.svg"/>
          <img src="/images/logos/next.svg"/>
          <img src="/images/logos/vercel.svg"/>

        </div>
      </div>
    </section>
  );
};

export default Aboutus;
