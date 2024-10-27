export async function isAuthorized(){
    return document.cookie.split(';').some(c => c.trim().startsWith('session_id' + '='));
}
