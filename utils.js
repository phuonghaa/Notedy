function compareTitle(a, b) {
    return a.title >= b.title ? 1 : -1;
};

function compareCreatedTime(a, b) {
    return a.createdDate - b.createdDate;
}

function compareModifiedTime(a, b){
    return a.modifiedDate - b.modifiedDate;
}

function formatDateHtml(date) {
    return `${date.getHours()}:${date.getMinutes()} <br> ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

function isValidTitle(name) {
    const VALID_NAME_REGEX = /^[a-zA-Z\w\s]+$/;
    return name.match(VALID_NAME_REGEX);
}

function highlightHtml(content, searchText) {
    let searchExp = new RegExp(searchText, `ig`);
    let matches = content.match(searchExp);
    if (matches) content = content.replace(matches[0], `<span class='highlight'>` + matches[0] + `</span>`)
    return content;
}

function getTitleFromLink(link){
    return link.trim().substr(2);
}

function autoGenerateImg() {
    let random = Math.floor(Math.random() * listImgs.length);
    return listImgs[random];
}

var listImgs = [
    `https://picsum.photos/id/867/150`, `https://picsum.photos/id/649/150`, `https://picsum.photos/id/933/150`, `https://picsum.photos/id/356/150`,
    `https://picsum.photos/id/888/150`, `https://picsum.photos/id/44/150`, `https://picsum.photos/id/608/150`, `https://picsum.photos/id/685/150`,
    `https://picsum.photos/id/482/150`, `https://picsum.photos/id/702/150`, `https://picsum.photos/id/736/150`, `https://picsum.photos/id/273/150`,
    `https://picsum.photos/id/77/150`, `https://picsum.photos/id/457/150`, `https://picsum.photos/id/201/150`, `https://picsum.photos/id/832/150`,
    `https://picsum.photos/id/192/150`, `https://picsum.photos/id/955/150`, `https://picsum.photos/id/67/150`, `https://picsum.photos/id/439/150`,
    `https://picsum.photos/id/289/150`, `https://picsum.photos/id/313/150`, `https://picsum.photos/id/743/150`, `https://picsum.photos/id/696/150`,
    `https://picsum.photos/id/190/150`, `https://picsum.photos/id/551/150`, `https://picsum.photos/id/988/150`, `https://picsum.photos/id/727/150`,
    `https://picsum.photos/id/272/150`, `https://picsum.photos/id/598/150`, `https://picsum.photos/id/860/150`, `https://picsum.photos/id/445/150`,
    `https://picsum.photos/id/476/150`, `https://picsum.photos/id/384/150`, `https://picsum.photos/id/638/150`, `https://picsum.photos/id/396/150`,
    `https://picsum.photos/id/900/150`, `https://picsum.photos/id/842/150`, `https://picsum.photos/id/228/150`, `https://picsum.photos/id/407/150`,
    `https://picsum.photos/id/938/150`, `https://picsum.photos/id/300/150`, `https://picsum.photos/id/478/150`, `https://picsum.photos/id/543/150`,
    `https://picsum.photos/id/96/150`, `https://picsum.photos/id/232/150`, `https://picsum.photos/id/173/150`, `https://picsum.photos/id/170/150`,
    `https://picsum.photos/id/726/150`, `https://picsum.photos/id/417/150`, `https://picsum.photos/id/700/150`, `https://picsum.photos/id/53/150`,
    `https://picsum.photos/id/943/150`, `https://picsum.photos/id/811/150`, `https://picsum.photos/id/209/150`, `https://picsum.photos/id/870/150`,
    `https://picsum.photos/id/580/150`, `https://picsum.photos/id/161/150`, `https://picsum.photos/id/227/150`, `https://picsum.photos/id/35/150`,
    `https://picsum.photos/id/785/150`, `https://picsum.photos/id/61/150`, `https://picsum.photos/id/403/150`, `https://picsum.photos/id/849/150`,
    `https://picsum.photos/id/316/150`, `https://picsum.photos/id/661/150`, `https://picsum.photos/id/922/150`, `https://picsum.photos/id/70/150`,
    `https://picsum.photos/id/919/150`, `https://picsum.photos/id/378/150`, `https://picsum.photos/id/243/150`, `https://picsum.photos/id/369/150`,
    `https://picsum.photos/id/923/150`, `https://picsum.photos/id/524/150`, `https://picsum.photos/id/970/150`, `https://picsum.photos/id/214/150`,
    `https://picsum.photos/id/554/150`, `https://picsum.photos/id/320/150`, `https://picsum.photos/id/756/150`, `https://picsum.photos/id/552/150`,
    `https://picsum.photos/id/137/150`, `https://picsum.photos/id/531/150`, `https://picsum.photos/id/863/150`, `https://picsum.photos/id/987/150`,
    `https://picsum.photos/id/23/150`, `https://picsum.photos/id/168/150`, `https://picsum.photos/id/315/150`, `https://picsum.photos/id/903/150`,
    `https://picsum.photos/id/770/150`, `https://picsum.photos/id/914/150`, `https://picsum.photos/id/431/150`, `https://picsum.photos/id/613/150`,
    `https://picsum.photos/id/456/150`, `https://picsum.photos/id/237/150`, `https://picsum.photos/id/555/150`, `https://picsum.photos/id/129/150`,
    `https://picsum.photos/id/568/150`, `https://picsum.photos/id/203/150`, `https://picsum.photos/id/887/150`, `https://picsum.photos/id/666/150`
]