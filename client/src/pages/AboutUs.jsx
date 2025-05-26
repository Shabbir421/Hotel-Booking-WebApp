import React from "react";

const AboutUs = () => {
  return (
    <div className="px-4 py-12 max-w-6xl mx-auto">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 md:p-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">About Our Company</h1>
        <p className="text-lg text-gray-700 mb-6">
          Join us on this journey of comfort and discovery, where hospitality meets innovation.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
            <h2 className="text-xl font-semibold mb-2 text-blue-600">DEVELOPMENT</h2>
            <p className="text-gray-700">
              Hotel Management & Booking Systems<br />
              Crafting seamless booking experiences with powerful software and intuitive interfaces.
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
            <h2 className="text-xl font-semibold mb-2 text-blue-600">RESEARCH</h2>
            <p className="text-gray-700">
              Hospitality Trends & User Experience<br />
              Enhancing service quality through deep analysis and user-centered innovation.
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
            <h2 className="text-xl font-semibold mb-2 text-blue-600">TRAINING</h2>
            <p className="text-gray-700">
              Hospitality Technology & Operations<br />
              Empowering teams with the latest tools and practices in hotel management systems.
            </p>
          </div>
        </div>

        <p className="text-gray-700 text-lg mb-6">
          <strong>HotelEase</strong>, established in 2023, is a rising leader in the digital hospitality space.
          We offer a comprehensive hotel booking platform designed for both customers and property managers.
          Our mission is to streamline bookings and elevate guest experiences through technology.
        </p>

        <p className="text-gray-700 text-lg mb-6">
          We are proud to be recognized as one of the most user-friendly and reliable platforms for hotel
          discovery and booking. Our commitment to quality and innovation makes us the preferred choice for
          travelers and businesses alike.
        </p>

        <p className="text-gray-700 text-lg mb-6">
          At HotelEase, we believe in creating smart travel solutions that empower users with choice,
          convenience, and confidence. From intuitive interfaces to real-time availability and pricing,
          we redefine how people experience hotel bookings.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-800">CONTACT US</h2>
        <p className="text-gray-700 mb-6">
          HotelEase is registered with the Ministry of Corporate Affairs and ISO 9001:2015 certified.
          We’re committed to maintaining global standards in quality and service.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h4 className="font-semibold text-gray-800">Ministry of Corporate Affairs</h4>
            <p className="text-sm text-gray-600">Government of India Registration</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h4 className="font-semibold text-gray-800">ISO Registration</h4>
            <p className="text-sm text-gray-600">Certified ISO 9001:2015 for Quality Management</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-gray-800">We Believe</h2>
        <p className="text-gray-700 mb-6">
          We believe the hospitality industry deserves digital solutions that are simple, powerful,
          and accessible to all.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-gray-800">Our Vision</h2>
        <p className="text-gray-700 mb-6">
          Our vision is to be the leading hotel booking solution across the globe, making travel easier and more enjoyable.
          We strive to contribute to the growth of our partners by helping them connect with more guests effortlessly.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-gray-800">Our Mission</h2>
        <p className="text-gray-700 mb-6">
          Our mission is to enhance the travel experience through creative software design and innovative development.
          We aim to deliver reliable, high-quality solutions that provide long-term value to both travelers and hoteliers.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-gray-800">Our Work Scope</h2>
        <p className="text-gray-700">
          As a growing force in hospitality technology, HotelEase delivers scalable hotel booking systems,
          customer support platforms, and operational training programs. We focus on providing optimal digital
          solutions at an affordable cost, helping our users and partners thrive in the fast-paced world of travel.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
