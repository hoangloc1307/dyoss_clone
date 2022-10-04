//Number
export function NumberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

//String
export function RemoveAscent(str) {
    if (str === null || str === undefined) return str;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    return str;
}

export function GetTagsFromCaption(str) {
    const regex = /#\w+(?=\s)|#\w+\w$/gim;
    return str.match(regex);
}

export function GetProductSlugsFromCaption(str) {
    const regex = /\/product\/[\w-]*/gim;
    return str.match(regex);
}

export function GetTitleFromCaption(str) {
    let index;
    let x = str.indexOf('#');
    let y = str.indexOf('Link sản phẩm:');

    index = x < 0 ? (y < 0 ? undefined : y) : y < 0 ? x : x < y ? x : y;

    return str.slice(0, index);
}

export function ConvertToDateString(timestamp, nation) {
    return new Date(timestamp).toLocaleDateString(nation, { year: 'numeric', month: 'long', day: 'numeric' });
}

//Validate
export function IsValidPhone(phone) {
    // eslint-disable-next-line
    return /((09|03|07|08|05)+([0-9]{8})\b)/g.test(phone);
}

export function IsValidName(name) {
    // eslint-disable-next-line
    return /^[a-zA-Z!@#\$%\^\&*\)\(+=._-]{2,}$/g.test(RemoveAscent(name));
}
