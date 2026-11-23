import { reactive, ref } from 'vue';
import { getErrorMessage, getFieldErrors } from '@/api/http';

/**
 * Lógica genérica de formularios, reutilizable en toda la app:
 *  1. valida en el cliente (`validate` devuelve { campo: 'mensaje' })
 *  2. evita envíos dobles
 *  3. si la API responde con errores de campo, los muestra junto a cada input
 *
 * @param {{
 *   initialValues: Record<string, any>,
 *   validate: (values: any) => Record<string, string>,
 *   onSubmit: (values: any) => Promise<void>,
 * }} options
 */
export function useForm({ initialValues, validate, onSubmit }) {
  const values = reactive({ ...initialValues });
  const errors = reactive({});
  const formError = ref('');
  const isSubmitting = ref(false);

  function clearErrors() {
    for (const key of Object.keys(errors)) delete errors[key];
    formError.value = '';
  }

  async function submit() {
    if (isSubmitting.value) return;
    clearErrors();

    const found = validate(values);
    if (Object.keys(found).length > 0) {
      Object.assign(errors, found);
      return;
    }

    isSubmitting.value = true;
    try {
      await onSubmit({ ...values });
    } catch (error) {
      const fieldErrors = getFieldErrors(error);
      Object.assign(errors, fieldErrors);
      formError.value =
        Object.keys(fieldErrors).length > 0 ? 'Revisa los campos marcados.' : getErrorMessage(error);
    } finally {
      isSubmitting.value = false;
    }
  }

  return { values, errors, formError, isSubmitting, submit };
}
