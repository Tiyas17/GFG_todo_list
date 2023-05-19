let problemListKey = 'algozenith_problems';
newBookmark = window.location.href;

window.addEventListener("load", () => {
	addBookmarkButton();
});
function addBookmarkButton() {
	const bookmarkBtn = document.createElement("img");
	bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
	bookmarkBtn.className = "btn_ref";
	bookmarkBtn.title = "Click to bookmark current timestamp";
	bookmarkBtn.style.height = "30px";
	bookmarkBtn.style.width = "30px";
	azAskDoubt = document.getElementsByClassName(
		"problems_header_content__title__L2cB2 g-mb-0"
	)[0].parentElement;
	azAskDoubt.appendChild(bookmarkBtn);



	bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
}

const addNewBookmarkEventHandler = async () => {
	currentProblemBookmarks = await fetchBookmarks();
	
	problemName = document.getElementsByClassName("g-m-0")[0].firstChild.textContent;
   
		 	
			
	const newBookmarkObj = {
		url: newBookmark,
		desc: problemName,
	};
	let addNewToBookmark = true;
	for (let i = 0; i < currentProblemBookmarks.length; i++) {
		if (currentProblemBookmarks[i].url == newBookmark) {
			addNewToBookmark = false;
		}
	}
	if (addNewToBookmark) {
		chrome.storage.sync.set({
			[problemListKey]: JSON.stringify([
				...currentProblemBookmarks,
				newBookmarkObj,
			]),
		});
	}
};



const fetchBookmarks = () => {
	return new Promise((resolve) => {
		chrome.storage.sync.get([problemListKey], (obj) => {
			resolve(obj[problemListKey] ? JSON.parse(obj[problemListKey]) : []);
		});
	});
};
