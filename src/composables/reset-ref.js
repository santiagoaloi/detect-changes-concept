/**
 * Creates a composable function to reset a reference to its initial state.
 *
 * @param {Object} reference - The reference object to be reset.
 * @param {Object} options - An options object.
 * @param {Object} [options.customDefault] - Custom default values for resetting the reference.
 * @param {string} [options.customDefault.name] - Custom default name value.
 * @param {string} [options.customDefault.lastName] - Custom default last name value.
 * @returns {Object} An object containing functions to manage the reference state.
 * @property {function} reset - A function to reset the reference to its initial state.
 * @property {function} hasNewValues - A computed function to check for new values in the reference.
 *
 * @example
 *
 * const form = ref({ name: 'Harry', lastName: 'Potter' });
 * const { reset, hasNewValues } = useResetRef(form, {
 *   customDefault: { name: 'Ron', lastName: 'Weasley' },
 * });
 *
 * if (hasNewValues) {
 *   log('Values have changed!');
 * } else {
 *   log('Values are the same.');
 * }
 *
 */

export function useResetRef(reference, options) {
  // Check if the reference is a Ref or a Reactive variable
  if (!isRef(reference) && !isReactive(reference)) {
    throw new Error('A Ref or a Reactive variable should be passed as an argument to resetRef')
  }

  let initialRefValue

  if (isRef(reference)) {
    // Make a deep copy of the initial Ref value
    initialRefValue = cloneDeep(reference.value)
  }

  if (isReactive(reference)) {
    // Make a deep copy of the initial Reactive object
    initialRefValue = cloneDeep(reference)
  }

  // Computed property to determine if there are new values compared to the initial state
  const hasNewValues = computed(() => {
    const currentRefValue = isRef(reference) ? reference.value : reference
    return !isEqual(currentRefValue, initialRefValue)
  })

  /**
   * Returns a deep copy of the default value, considering custom default options.
   * @returns {Object} A deep copy of the default value.
   */
  function setDefaultValue() {
    return cloneDeep(options?.customDefault || initialRefValue)
  }

  /**
   * Resets the reference to its initial state.
   */
  function reset() {
    if (isRef(reference)) {
      // For Ref, deep copy the default value and assign it back to the reference's value
      reference.value = setDefaultValue()
    }

    if (isReactive(reference)) {
      if (isObject(toRaw(reference))) {
        // Clear the reactive object by deleting all keys
        for (const key in toRaw(reference)) {
          delete reference[key]
        }

        // Assign new default values to the reactive object
        Object.assign(reference, setDefaultValue())
      }

      if (isArray(toRaw(reference))) {
        // For reactive arrays, clear the existing elements and push new default elements
        reference.splice(0, reference.length, ...setDefaultValue())
      }
    }
  }

  /**
   * Updates the initial values based on the current reference state.
   */
  function syncInitialValues() {
    if (isRef(reference)) {
      initialRefValue = cloneDeep(reference.value)
    }

    if (isReactive(reference)) {
      initialRefValue = cloneDeep(reference)
    }

    reset()
  }

  // Return an object with reset and hasNewValues functions
  return { reset, hasNewValues, syncInitialValues }
}
