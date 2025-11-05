<template>
  <div class="contact-page">
   
    <section class="contact-hero text-center text-white d-flex align-items-center">
      <div class="container py-5">
        <h1 class="display-5 fw-bold mb-3 fade-in">Get In Touch</h1>
        <p class="lead mb-4 fade-in-delay">
          Whether you’re looking for your next timeless piece or need help with an order, we’re here for you.
        </p>
        <button class="btn btn-outline-light px-4 py-2 rounded-pill"
        @click="[router.push({name: APP_ROUTE_NAMES.HOME})]">
          Explore Watches
        </button>
      </div>
    </section>

    <!-- Contact Info + Form Section -->
    <section class="contact-section py-5">
      <div class="container">
        <div class="row g-5 align-items-center">
          <!-- Contact Info -->
          <div class="col-12 col-lg-5">
            <h2 class="fw-bold mb-4">Reach Out to Us</h2>
            <p class="text-muted mb-4">
              Our team is dedicated to providing exceptional service and support to every TickTock customer.
            </p>

           <div v-for="(info, i) in contactInfo" :key="i" class="d-flex align-items-start mb-4">
  <div class="icon-box me-3">
    <i :class="info.icon" class="fs-4 text-gradient"></i>
  </div>
  <div>
    <h6 class="fw-semibold mb-1">{{ info.title }}</h6>
    <p class="text-muted mb-0" v-html="info.details"></p>
  </div>
</div>
          </div>

          <!-- Contact Form -->
          <div class="col-12 col-lg-7">
            <div class="card border-0 shadow-sm rounded-4 p-4 contact-form">
              <h4 class="fw-semibold mb-4">Send Us a Message</h4>
              <form @submit.prevent="onSubmit">
                <div class="row g-3">
                  <div class="col-md-6">
                    <input type="text" v-model="form.name" class="form-control" placeholder="Your Name" required />
                  </div>
                  <div class="col-md-6">
                    <input type="email" v-model="form.email" class="form-control" placeholder="Your Email" required />
                  </div>
                  <div class="col-12">
                    <textarea v-model="form.message" class="form-control" rows="4" placeholder="Your Message" required></textarea>
                  </div>
                  <div class="col-12 text-end">
                    <button type="submit" class="btn btn-dark px-4 rounded-pill">Send Message</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Map -->
   <section class="map-section mt-5">
  <iframe
    src="https://www.google.com/maps?q=28.5461568,77.4440099&z=16&output=embed"
    width="100%"
    height="400"
    style="border:0;"
    allowfullscreen=""
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
  ></iframe>
</section>

  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { APP_ROUTE_NAMES } from '@/constants/routerName';
import { alerts } from '@/utility/alert';

const router = useRouter()
const { showSuccess} = alerts()

const contactInfo = [
  {
    title: "Visit Us",
    icon: "bi bi-geo-alt-fill",
    details: "Krishna Ellite Homes<br />Tower B, 302<br />Greater Noida, India",
  },
  {
    title: "Call Us",
    icon: "bi bi-telephone-fill",
    details: "+91-9873957498<br />+91-9506046219<br />Mon–Fri: 9am–5pm",
  },
  {
    title: "Email Us",
    icon: "bi bi-envelope-fill",
    details: "rajatsharma221098@gmail.com",
  },
]

const form = ref({ name: "", email: "", message: "" });

const onSubmit = () => {
  showSuccess(`Thank you, ${form.value.name}! We'll get back to you soon.`)
  form.value = { name: "", email: "", message: "" };
};
</script>

<style scoped>
.contact-page {
  background-color: var(--color-light);
  overflow-x: hidden;
}

/* Hero Section */
.contact-hero {
  background: url("/src/assets/watch-background.webp") center/cover no-repeat;
  min-height: 60vh;
  position: relative;
}
.contact-hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, rgba(30,60,114,0.4), rgba(42,82,152,0.4), rgba(252,176,69,0.4));
  background-size: 300% 300%;
  animation: moveGradient 12s ease infinite;
  z-index: 0;
}
.contact-hero .container {
  position: relative;
  z-index: 1;
}

/* Text Gradient for icons (using global colors) */
.text-gradient {
  background: linear-gradient(45deg, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Contact Form */
.contact-form input,
.contact-form textarea {
  border-radius: 12px;
  border: 1px solid #dee2e6;
  transition: var(--transition-default);
}
.contact-form input:focus,
.contact-form textarea:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 0.2rem rgba(30, 60, 114, 0.15);
  outline: none;
}

/* Icon Box */
.icon-box {
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(30, 60, 114, 0.08);
  border-radius: 50%;
}

.icon-box i {
  background: linear-gradient(45deg, var(--color-primary), var(--color-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}


/* Simple fade-in animations */
.fade-in {
  opacity: 0;
  animation: fadeIn 0.8s ease forwards;
}
.fade-in-delay {
  opacity: 0;
  animation: fadeIn 1.2s ease forwards;
}
@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

@keyframes moveGradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Responsive */
@media (max-width: 768px) {
  .contact-hero {
    min-height: 50vh;
    background-position: top;
  }
  .contact-form {
    padding: 1.5rem;
  }
  .btn {
    font-size: 0.9rem;
  }
}
</style>

