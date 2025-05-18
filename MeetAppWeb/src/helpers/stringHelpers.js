
// texti .,!,? vs kısımlarına gelene kadar maxLengthi geçmeyecek şekilde kesiyor
export const createDescSummary = (text, maxLength) => {
    if (!text || text.length <= maxLength) return text;

    const sliced = text.slice(0, maxLength);
    const lastDot = sliced.lastIndexOf('.');
    const lastQuestion = sliced.lastIndexOf('?');
    const lastExclamation = sliced.lastIndexOf('!');

    const lastEnd = Math.max(lastDot, lastQuestion, lastExclamation);

    if (lastEnd === -1) {
        const lastSpace = sliced.lastIndexOf(' ');
        return sliced.slice(0, lastSpace) + '...';
    }

    return sliced.slice(0, lastEnd + 1);
};

// DateTime şeklindeki string parçalara ayırıp ay yerine string olarak  yazıp dönüyor
export const formatDateTimeTR = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('tr-TR', { month: 'long' }).toUpperCase(); // MAYIS
    const year = date.getFullYear();

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day} ${month} ${year} ${hours}:${minutes}`;
}

export const sliceDateTime = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('tr-TR', { month: 'long' }).toUpperCase();
    const year = date.getFullYear();

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    const time = {
        day: day,
        month: month,
        year: year,
        hours: hours,
        minutes: minutes,
    };

    return time;
}


export const calcMonthDiff = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    const years = d2.getFullYear() - d1.getFullYear();
    const months = d2.getMonth() - d1.getMonth();

    return years * 12 + months;
}


