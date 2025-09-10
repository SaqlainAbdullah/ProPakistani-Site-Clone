// ProPakistani Homepage JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initializeShowMoreButton();
  initializeNewsletterForm();
  initializeSearchForm();
  initializeSmoothScrolling();
  initializeArticleHovers();
});

// Show More Button Functionality
function initializeShowMoreButton() {
  const showMoreBtn = document.querySelector(".show-more-btn");
  const newsGrid = document.querySelector(".news-grid");

  if (showMoreBtn && newsGrid) {
    showMoreBtn.addEventListener("click", function () {
      // Simulate loading more articles
      const additionalArticles = createAdditionalArticles();

      // Add loading state
      showMoreBtn.textContent = "LOADING...";
      showMoreBtn.disabled = true;

      // Simulate API delay
      setTimeout(() => {
        // Add new articles with animation
        additionalArticles.forEach((article, index) => {
          setTimeout(() => {
            newsGrid.appendChild(article);
          }, index * 100);
        });

        // Reset button state
        showMoreBtn.textContent = "SHOW MORE +";
        showMoreBtn.disabled = false;

        // Hide button after loading more (simulate end of content)
        if (newsGrid.children.length > 18) {
          showMoreBtn.style.display = "none";
        }
      }, 1500);
    });
  }
}

// Create additional news articles
function createAdditionalArticles() {
  const additionalNews = [
    {
      image: "./images/Tiktok-395x235.jpg",
      time: "5:30 pm | Sep 9, 2025",
      title: "Police in Gilgit-Baltistan Banned from using Tiktok",
    },
    {
      image: "./images/BOP-Digital-395x235.jpg",
      time: "5:20 pm | Sep 9, 2025",
      title: "BOP Launches Industry's first Digital business loan solution",
    },
    {
      image: "./images/Pakistan_Kazakhstan-transformed-395x235.jpeg",
      time: "5:10 pm | Sep 9, 2025",
      title:
        "Pakistan, Kazakhstan to strengthen Economic Ties with $1 Billion Trade Target",
    },
    {
      image: "./images/rupee-395x235.jpg",
      time: "5:00 pm | Sep 9, 2025",
      title:
        "Pakistani rupees Records 23rd consecutive gain Against US Dollars",
    },
  ];

  return additionalNews.map((news) => {
    const article = document.createElement("article");
    article.className = "news-item";
    article.style.opacity = "0";
    article.style.transform = "translateY(20px)";

    article.innerHTML = `
            <div class="article-image">
                <img src="${news.image}" alt="${news.title}">
            </div>
            <div class="article-meta">
                <span class="time">${news.time}</span>
            </div>
            <h3>${news.title}</h3>
        `;

    // Animate in
    setTimeout(() => {
      article.style.transition = "all 0.5s ease-out";
      article.style.opacity = "1";
      article.style.transform = "translateY(0)";
    }, 50);

    return article;
  });
}

// Newsletter Form Functionality
function initializeNewsletterForm() {
  const newsletterForm = document.querySelector(".newsletter-form");
  const emailInput = newsletterForm?.querySelector('input[type="email"]');
  const submitBtn = newsletterForm?.querySelector("button");

  if (newsletterForm && emailInput && submitBtn) {
    submitBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const email = emailInput.value.trim();

      if (!email) {
        showNotification("Please enter your email address", "error");
        return;
      }

      if (!isValidEmail(email)) {
        showNotification("Please enter a valid email address", "error");
        return;
      }

      // Simulate subscription process
      submitBtn.textContent = "Subscribing...";
      submitBtn.disabled = true;

      setTimeout(() => {
        showNotification("Successfully subscribed to newsletter!", "success");
        emailInput.value = "";
        submitBtn.textContent = "Subscribe";
        submitBtn.disabled = false;
      }, 1500);
    });
  }
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Search Form Functionality
function initializeSearchForm() {
  const searchForm = document.querySelector(".search");
  const searchInput = searchForm?.querySelector("input");
  const searchBtn = searchForm?.querySelector("button");

  if (searchForm && searchInput && searchBtn) {
    // Handle search button click
    searchBtn.addEventListener("click", function (e) {
      e.preventDefault();
      performSearch(searchInput.value.trim());
    });

    // Handle Enter key in search input
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        performSearch(this.value.trim());
      }
    });
  }
}

// Perform search (simulated)
function performSearch(query) {
  if (!query) {
    showNotification("Please enter a search term", "error");
    return;
  }

  // Simulate search
  showNotification(`Searching for "${query}"...`, "info");

  setTimeout(() => {
    showNotification(`Search completed for "${query}"`, "success");
  }, 2000);
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => notification.remove());

  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Style the notification
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "15px 20px",
    borderRadius: "8px",
    color: "white",
    fontWeight: "600",
    zIndex: "9999",
    minWidth: "250px",
    transform: "translateX(100%)",
    transition: "transform 0.3s ease-out",
    backgroundColor:
      type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6",
  });

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 10);

  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Article hover effects
function initializeArticleHovers() {
  const articles = document.querySelectorAll(
    ".news-item, .hero-main, .sidebar-article"
  );

  articles.forEach((article) => {
    article.addEventListener("mouseenter", function () {
      // Add subtle scale effect
      this.style.transform = "translateY(-5px) scale(1.02)";
    });

    article.addEventListener("mouseleave", function () {
      // Reset transform
      this.style.transform = "";
    });

    // Add click handler for articles
    article.addEventListener("click", function () {
      // Simulate article click
      const title = this.querySelector("h2, h3");
      if (title) {
        showNotification(
          `Opening article: ${title.textContent.substring(0, 50)}...`,
          "info"
        );
      }
    });
  });
}

// Mobile menu toggle (if needed)
function initializeMobileMenu() {
  // This would be implemented if you want a mobile hamburger menu
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mainNav = document.querySelector(".main-nav");

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener("click", function () {
      mainNav.classList.toggle("active");
    });
  }
}

// Lazy loading for images (performance optimization)
function initializeLazyLoading() {
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  }
}

// Social media sharing (if needed)
function shareArticle(title, url) {
  if (navigator.share) {
    navigator.share({
      title: title,
      url: url,
    });
  } else {
    // Fallback - copy to clipboard
    navigator.clipboard.writeText(url).then(() => {
      showNotification("Article link copied to clipboard!", "success");
    });
  }
}

// Theme toggle (light/dark mode) - optional feature
function initializeThemeToggle() {
  const themeToggle = document.querySelector(".theme-toggle");

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      document.body.classList.toggle("dark-theme");
      const isDark = document.body.classList.contains("dark-theme");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });

    // Load saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-theme");
    }
  }
}

// Add scroll-to-top functionality
function initializeScrollToTop() {
  // Create scroll to top button
  const scrollBtn = document.createElement("button");
  scrollBtn.innerHTML = "↑";
  scrollBtn.className = "scroll-to-top";
  scrollBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #2dd4bf;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
    `;

  document.body.appendChild(scrollBtn);

  // Show/hide based on scroll position
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 500) {
      scrollBtn.style.opacity = "1";
    } else {
      scrollBtn.style.opacity = "0";
    }
  });

  // Scroll to top on click
  scrollBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Initialize scroll to top
initializeScrollToTop();
