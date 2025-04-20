export function CharityLanding({ config }) {
    console.log(config);
    return (<div className="charity-landing">
      {/* Hero Section */}
      <section className="hero-section py-16" style={{
            backgroundImage: `url(${config.heroSection?.properties.backgroundImage.default})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}>
        <div className="container mx-auto text-center text-white">
          <h1 className="text-4xl font-bold">
            {config.heroSection?.properties.heading.default}
          </h1>
          <p className="mt-4 text-lg">
            {config.heroSection?.properties.subheading.default}
          </p>
        </div>
      </section>

      {/* Donation Call-to-Action */}
      <section className="donation-cta py-12 bg-indigo-600 text-white text-center">
        <h2 className="text-3xl font-bold">
          {config.donationCTA?.properties.heading.default}
        </h2>
        <a href={config.donationCTA?.properties.donationLink.default} className="mt-4 inline-block px-6 py-3 bg-white text-indigo-600 font-medium rounded-md shadow hover:bg-gray-100">
          {config.donationCTA?.properties.buttonText.default}
        </a>
      </section>

      {/* Featured Causes */}
      <section className="featured-causes py-16 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Featured Causes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {config.featuredCauses?.default.map((cause, index) => (<div key={index} className="cause-card bg-white rounded-lg shadow-md overflow-hidden">
                <img src={cause.imageUrl} alt={cause.title} className="w-full h-48 object-cover"/>
                <div className="p-4">
                  <h3 className="text-xl font-bold">{cause.title}</h3>
                  <p className="mt-2 text-gray-600">{cause.description}</p>
                </div>
              </div>))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section py-12 bg-gray-800 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold">
            {config.contactSection?.properties.heading.default}
          </h2>
          <p className="mt-4">
            Email: {config.contactSection?.properties.email.default} | Phone:{" "}
            {config.contactSection?.properties.phone.default}
          </p>
        </div>
      </section>
    </div>);
}
