export default function Configurations() {
    //const API_IP_ADDRESS = "10.3.3.119"
    const API_IP_ADDRESS = "10.3.1.176"
    const API_PORT = "8080"

    const configData = {
        "API_BASE_URL": "http://" + API_IP_ADDRESS + ":" + API_PORT + "/",
    }

    return configData;
}