// Redirige l'adresse de prod pages.dev vers le domaine perso.
// Hôte exact uniquement : les previews de branche (<branche>.odilon-corby.pages.dev) restent accessibles.
export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  if (url.hostname === 'odilon-corby.pages.dev') {
    url.hostname = 'odiloncorby.com';
    return Response.redirect(url.toString(), 301);
  }
  return next();
}
