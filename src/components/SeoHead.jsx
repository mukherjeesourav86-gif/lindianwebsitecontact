import { useEffect } from 'react';
import { useResources } from '../context/ResourceContext';

const SeoHead = () => {
  const { seoSettings } = useResources();

  useEffect(() => {
    // Update document title
    document.title = seoSettings.title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', seoSettings.description);
    }

    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', seoSettings.keywords);

    // Update meta author
    const metaAuthor = document.querySelector('meta[name="author"]');
    if (metaAuthor) {
      metaAuthor.setAttribute('content', seoSettings.author);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', seoSettings.title);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', seoSettings.description);
    }

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute('content', seoSettings.ogImage);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', seoSettings.canonicalUrl);
    }

    const ogImageAlt = document.querySelector('meta[property="og:image:alt"]');
    if (ogImageAlt) {
      ogImageAlt.setAttribute('content', `${seoSettings.title} - Preview`);
    }

    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', seoSettings.title);
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', seoSettings.description);
    }

    const twitterSite = document.querySelector('meta[name="twitter:site"]');
    if (twitterSite) {
      twitterSite.setAttribute('content', seoSettings.twitterHandle);
    }

    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage) {
      twitterImage.setAttribute('content', seoSettings.ogImage);
    }

    // Update canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', seoSettings.canonicalUrl);
    }

    // Update structured data
    const structuredData = document.querySelector('script[type="application/ld+json"]');
    if (structuredData) {
      const data = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": seoSettings.title.split(' - ')[0],
        "url": seoSettings.canonicalUrl,
        "description": seoSettings.description,
        "publisher": {
          "@type": "Organization",
          "name": seoSettings.author
        },
        "keywords": seoSettings.keywords,
        "dateModified": seoSettings.lastUpdated
      };
      structuredData.innerHTML = JSON.stringify(data, null, 2);
    }
  }, [seoSettings]);

  return null;
};

export default SeoHead;
