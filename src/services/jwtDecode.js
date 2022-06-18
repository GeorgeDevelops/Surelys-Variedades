
import jwtDecode from "jwt-decode";


export function jwtDecoded(jwt){
    try {
        if (jwt){
            const decoded =  jwtDecode(jwt);
            return decoded;

        } else {
            return null;
        }

    } catch (ex) {
        return null;
    }
}

export default {
    decode: jwtDecoded
}