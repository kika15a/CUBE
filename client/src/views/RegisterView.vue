<script setup>
import GlassCard from '@/components/ui/GlassCard.vue';
import RubikCube from '@/components/ui/RubikCube.vue';
import RegisterForm from '@/features/auth/components/RegisterForm.vue';

const PREVIEW_FACES = {
  front: 'white',
  back: 'yellow',
  top: 'blue',
  bottom: 'green',
  left: 'orange',
  right: 'red',
};
</script>

<template>
  <section class="auth">
    <GlassCard
      class="auth__card"
      :lift="false"
    >
      <h1 class="auth__title">
        Crear cuenta
      </h1>
      <div class="auth__cube">
        <RubikCube
          :faces="PREVIEW_FACES"
          :dimension="100"
          label="Cubo Rubik decorativo"
        />
      </div>
      <RegisterForm />
    </GlassCard>
  </section>
</template>

<style scoped>
.auth {
  padding: 3rem 5% 1rem;
}
.auth__card {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 2.5rem;
  text-align: center;
}
.auth__title {
  margin-bottom: 1.5rem;
  font-size: 2.2rem;
  color: var(--color-accent);
}
.auth__cube {
  margin-bottom: 2rem;
}
</style>
