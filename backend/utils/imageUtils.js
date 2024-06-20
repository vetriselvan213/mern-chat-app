export const convertBufferToBase64 = (buffer, contentType) => {
    const base64String = Buffer.from(buffer, "binary").toString("base64");
    return `data:${contentType};base64,${base64String}`;
};