export async function sendToSheet(data) {
    const endpoint = "https://script.google.com/macros/s/AKfycbypJBrTQdig4W-G3hXVRN8SPJ7JPDoV6fPU6KZgYW43VqLiUN3gVH3q-zqY-5hQ40NSMA/exec";

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const text = await response.text();
        return text === "Success";
    } catch (error) {
        console.error("Error sending to sheet:", error);
        return false;
    }
}
