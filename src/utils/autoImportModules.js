/*
 * Anything under @/modules
 * will be auto-imported.
 */
const modules = import.meta.glob('@M/*.js', { eager: true })
export default (app) => Object.values(modules).map((module) => module.install(app))
