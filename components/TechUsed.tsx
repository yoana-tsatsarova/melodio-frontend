import React from "react";

const Aboutus = () => {
  return (
    <section
      className={`flex flex-col min-h-screen bg-gray-900 text-gray-100 py-20 md:text-4xl text-3xl`}>
      <div className="container mx-auto px-11">
        <p className="leading-tight max-w-5xl tracking-tight mx-auto text-4xl">
          <strong> We will help you ship better apps, faster. </strong> Our team
          of expert engineers has created the best user experiences in some of
          the most popular apps worldwide.
        </p>
      </div>
      <div className="container mx-auto px-11 text-center mt-28">
        <h2>
          <strong>Our Team</strong>
        </h2>
        <div className="mt-2"> the &ldquo;spec-ops&rdquo;</div>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-20">
          <div>Members</div>
          <div>Members</div>
          <div>Members</div>
          <div>Members</div>

        </div>
      </div>
    </section>
  );
};

export default Aboutus;
