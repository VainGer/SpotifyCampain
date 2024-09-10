import { globlas } from "./globals.js";
import { User } from "./models/user.model.js";

/**
 * The `login` function handles user login functionality by checking the entered username and password
 * against stored user data in localStorage and redirecting to the main page if the credentials are
 * correct.
 * @param event - The `event` parameter in the `login` function is an event object that represents the
 * event that is being handled, in this case, it is used to prevent the default behavior of form
 * submission when the login form is submitted. By calling `event.preventDefault()`, the default form
 * submission behavior is prevented
 * @return quits from the function after recieving wrong value
 */
export function login(event) {
    event.preventDefault();
    let username = document.querySelector(`#username`).value;
    let password = document.querySelector(`#password`).value;
    if (username === `` || password === ``) {
        alert(`שדות שם משתמש וסיסמה צריכים להיות מלאים`);
        return;
    }
    let users = JSON.parse(localStorage.getItem(`users`));
    if (!users) {
        users = [];
        localStorage.setItem(`users`, JSON.stringify(users));
        alert(`שם משתמש או סיסמה לא נכונים, אם אינך לא רשום למערכת לחץ על כפתור "להרשמה"`);
    }
    else if (users.length === 0) {
        alert(`שם משתמש או סיסמה לא נכונים, אם אינך לא רשום למערכת לחץ על כפתור "להרשמה"`);
    }
    else {
        let foundUser = false;
        users.forEach(user => {
            let currentUser = new User(user.userName, user.password, user.banner, user.landingPage, user.newsLetter, user.numOfImg, user.numOfTextEdit);
            if (currentUser.getUsername() === username) {
                foundUser = true;
                if (currentUser.confirmUser(username, password)) {
                    localStorage.setItem(`currentUser`, JSON.stringify(currentUser));
                    window.location.href = './pages/mainPage.html';
                }
                else {
                    alert('סיסמה לא נכונה');
                }
            }
        });
        if (!foundUser) {
            alert(`אינך רשום במערכת, בשביל להמשיך לחץ על כפתור להרשמה`);
        }
    }
}

/**
 * The function `addHeader` add a navigation menu in the header of a webpage.
 */
export function addHeader() {
    let header = `<button id="openAndCloseNav"></button>
        <nav>
        <ul id="navUl">
            <li><a href="../pages/mainPage.html">חזרה לדף הראשי</a></li>
            <li><a href="../index.html">חזרה לדף כניסה</a></li>
            <li><a href="./bannerEditor.html">עורך באנרים</a></li>
            <li><a href="./landingPageEditor.html">עורך עמוד נחיתה</a></li>
            <li><a href="./newsLetterEditor.html">עורך דף שיווקי</a></li>
            <li><a href="./landingPage.html">עמוד נחיתה לדוגמה</a></li>
            <li><a href="./banners.html">באנרים לדוגמה</a></li>
            <li><a href="./newsLetter.html">דף שיווקי לדוגמה</a></li>
            </ul>
        </nav>
    `;
    let headerElement = document.querySelector(`header`);
    headerElement.innerHTML = header;
}

/**
 * The `register` function handles user registration by checking for existing usernames,
 * creating new users, and storing user data in local storage.
 * @param event - The `event` parameter in the `register` function is an event object that represents
 * the event that is being handled, such as a form submission. In this case, the function is used to
 * handle the registration process on a website, where the event is likely a form submission event
 * triggered by the user
 * @return quits from the function after recieving wrong value
 */
export function register(event) {
    event.preventDefault();
    let userCreated = false;
    let usernameFound = false;
    let regForm = document.querySelector(`#registration`);
    let loginForm = document.querySelector(`#loginForm`);
    let username = document.querySelector(`#usernameRegister`).value;
    let password = document.querySelector(`#passwordRegister`).value;
    if (username === `` || password === ``) {
        alert(`שדות שם משתמש וסיסמה צריכים להיות מלאים`);
        return;
    }
    let users = JSON.parse(localStorage.getItem(`users`));
    if (!users) {
        users = [];
        localStorage.setItem(`users`, JSON.stringify(users));
    }
    users.forEach(user => {
        let currentUser = new User(user.userName, user.password);
        if (username === currentUser.userName) {
            usernameFound = true;
            alert(`שם משתמש בשימוש, בחר שם משתמש אחר`);
            document.querySelector(`#usernameRegister`).value = ``;
            document.querySelector(`#passwordRegister`).value = ``;
        }
    });
    if (!usernameFound) {
        users.push(new User(username, password));
        userCreated = true;
    }
    if (userCreated) {
        localStorage.setItem(`users`, JSON.stringify(users));
        regForm.style.display = `none`;
        loginForm.style.display = `grid`;
    }
}

/**
 * The function `openAndCloseNav` toggles the display of a navigation element and changes the
 * background image of a button accordingly.
 * @param event - The `event` parameter in the `openAndCloseNav` function is an event object that
 * represents the event that triggered the function, such as a click event on a button. It is commonly
 * used to prevent the default behavior of an event, access the target element that triggered the
 * event, and perform
 */
export function openAndCloseNav(event) {
    event.preventDefault();
    let btn = event.target;
    let openSrc = `../assets/icons/menu.png`;
    let closeSrc = `../assets/icons/close.png`
    let nav = document.querySelector(`nav`);
    if (nav.style.display === `grid`) {
        nav.style.display = `none`;
        btn.style.backgroundImage = `url(${openSrc})`;
    }
    else {
        nav.style.display = `grid`;
        btn.style.backgroundImage = `url(${closeSrc})`;
    }
}

/**
 * The `openRegisterForm` function prevents the default event, hides the login form, and displays the
 * registration form.
 * @param event - The `event` parameter is an event object that is passed to the `openRegisterForm`
 * function when it is called. It is typically an event that triggers the function, such as a click
 * event on a button or a form submission event. In this case, the function is preventing the default
 * behavior
 */
export function openRegisterForm(event) {
    event.preventDefault();
    let regForm = document.querySelector(`#registration`);
    let loginForm = document.querySelector(`#loginForm`);
    loginForm.style.display = `none`;
    regForm.style.display = `grid`;
}

//landing page
/**
 * The function `setTimer` calculates the time left until a specified date and time and displays it in
 * days, hours, minutes, and seconds on a specified HTML element.
 * @param year - The `year` parameter in the `setTimer` function represents the year for which you want
 * to set the timer. It is a numerical value representing the year (e.g., 2022).
 * @param month - The `month` parameter in the `setTimer` function represents the month of the year for
 * which you want to set the timer. In JavaScript, the month parameter starts from 0 for January to 11
 * for December. So, when you pass the month parameter to the function, make sure to
 * @param day - The `day` parameter in the `setTimer` function represents the day of the month for
 * which you want to set the timer. It is a numeric value between 1 and 31, depending on the month.
 * @param hour - The `hour` parameter in the `setTimer` function represents the hour at which the timer
 * should expire. It is used to calculate the remaining time until that specific hour on the specified
 * date.
 * @param min - The `min` parameter in the `setTimer` function represents the minutes component of the
 * time you want to set the timer for. It is used to specify the minutes at which the timer should
 * expire.
 * @param sec - The `sec` parameter in the `setTimer` function represents the seconds component of the
 * time you want to set the timer for. It is used to specify the exact time when the timer should
 * expire.
 */
export function setTimer(year, month, day, hour, min, sec) {
    let timerElement = document.querySelector(`#timerValue`);
    let expirationDate = new Date(year, month, day, hour, min, sec).getTime();
    let now = new Date().getTime();
    let timeLeft = expirationDate - now;
    let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    if (timeLeft <= 0)
        timerElement.innerHTML = `המבצע נגמר`;
    else
        timerElement.innerHTML = `${days}D:${hours}H:${minutes}M:${seconds}S`
}

/**
 * The `btnsLandingPage` function handles button click events on a landing page, redirecting to a
 * specific URL or displaying a pop-up message based on the clicked button's ID.
 * @param event - The `event` parameter in the `btnsLandingPage` function is an event object that
 * represents an event being handled by the function. In this case, the function is used to handle
 * button clicks on a landing page. The function first prevents the default behavior of the event
 * (e.g.,
 */
export function btnsLandingPage(event) {
    event.preventDefault();
    let button = event.target;
    if (button.id.includes(`forMore`)) {
        window.location.href = `https://www.spotify.com/il-en/premium/`;
    }
    else {
        let div = document.querySelector(`#pop-up`);
        let p = document.querySelector(`#pop-up p`);
        let okayBtn = document.querySelector(`#pop-up button`);
        let name;
        if (!div) {
            div = document.createElement(`div`);
            div.id = `pop-up`;
            p = document.createElement(`p`);
            div.appendChild(p);
            okayBtn = document.createElement(`button`);
            okayBtn.classList.add(`btns`);
            div.appendChild(okayBtn);
            okayBtn.innerHTML = `לחזור לצפייה בדף`;
        }
        let Pcontent = ``;
        if (button.id.includes(`leaveMsg`)) {
            name = document.querySelector(`#emailToAnswer`).value;
            Pcontent = `${name}<br>
            תודה שהשארתם לנו הודעה, נחזור אליכם בהקדם`;
        }
        else {
            name = document.querySelector(`#email`).value;
            Pcontent = `${name}<br>
            תודה שנרשתם לרשימת התפוצה שלנו, <br>תוכלו להסיר את עצמכם מהרשימה בכל רגע.`;
        }
        p.innerHTML = Pcontent;
        document.querySelector(`body`).appendChild(div);
        okayBtn.addEventListener(`click`, () => {
            if (document.querySelector(`#pop-up`))
                document.querySelector(`body`).removeChild(div);

        });
    }
}

//editors

//calls functions for bannerEditor page
export function bannerEditor() {
    setBannerStyle();
    updateElement();
    addFontsAndSizes();
    bannerEvenetListeners();
}
//calls functions for landing page and newsletter pages
export function landingPageAndNewsletterEditor() {
    addFontsAndSizes();
    chooseStyle();
    updateElement();
    setLPandNLeditorsEventListeners();
}

/**
 * The function `setLPandNLeditorsEventListeners` sets event listeners for various elements on the page
 * for handling color changes, image additions, text editing, saving changes, and resetting to default
 * values.
 */
function setLPandNLeditorsEventListeners() {
    let clrs = document.querySelector(`#clrs`);
    clrs.addEventListener(`change`, changeElementClr);
    let imgFile = document.querySelector(`#addImgFile`);
    imgFile.addEventListener(`change`, addImg);
    let imgLink = document.querySelector(`#addImgLink`);
    imgLink.addEventListener(`keyup`, addImg);
    let editableTxt = document.querySelectorAll(`.editable`);
    editableTxt.forEach(edit => {
        if (!edit.innerHTML.includes(`X`))
            edit.addEventListener(`click`, editText);
        else edit.addEventListener(`click`, changeIcon);
    });
    let saveBtn = document.querySelector(`#save`);
    saveBtn.addEventListener(`click`, saveOnPage);
    let restoreBtn = document.querySelector(`#resetToDefaults`);
    restoreBtn.addEventListener(`click`, resetToDefaults);
}

//the function stores and returns the needed html element
function getHtmlTemplate(templateNumber) {
    let template1;
    let template2;
    if (window.location.href.includes(`landing`)) {
        template1 = `<section id="landingPage"> <section id="hero" class="grid">
        <div id="callToAction" class="grid">
            <h1 class="editable">כותרת</h1>
            <p class="editable">
            תוכן הפסקה
            </p>
            <span class="editable">משפט נוסף</span>
            <button class="btns editable" id="forMoreBtn">כפתור הנעה לפעולה</button>
        </div>
        <img id="logo" src="" alt="לוגו">
    </section>
    <h3 id="timerH3" class="editable">כותרת משנית</h3>
    <section id="timer">
        <img src="" alt="תמונה">
        <h3 id="timerValue" class="editable">תוכן טקסטואלי על גבי תמונה</h3>
    </section>
    <h3 class="editable">טבלת השוואת</h3>
    <section id="plans">
        <table>
            <tr>
                <th class="editable">עמודה ראשית 1</th>
                <th class="editable">עמודה ראשית 2</th>
                <th class="editable">עמודה ראשית 3</th>
            </tr>
            <tr>
                <td class="editable">תכונה</td>
                <td class="imgTd editable">אייקון של X או V</td>
                <td class="imgTd editable">אייקון של X או V</td>
            </tr>
             <tr>
                <td class="editable">תכונה</td>
                <td class="imgTd editable">אייקון של X או V</td>
                <td class="imgTd editable">אייקון של X או V</td>
            </tr>
            <tr>
                <td class="editable">תכונה</td>
                <td class="imgTd editable">אייקון של X או V</td>
                <td class="imgTd editable">אייקון של X או V</td>
            </tr>
           <tr>
                <td class="editable">תכונה</td>
                <td class="imgTd editable">אייקון של X או V</td>
                <td class="imgTd editable">אייקון של X או V</td>
            </tr>
          <tr>
                <td class="editable">תכונה</td>
                <td class="imgTd editable">אייקון של X או V</td>
                <td class="imgTd editable">אייקון של X או V</td>
            </tr>
          <tr>
                <td class="editable">תכונה</td>
                <td class="imgTd editable">אייקון של X או V</td>
                <td class="imgTd editable">אייקון של X או V</td>
            </tr>
        </table>
    </section>
    <h3 class="editable">כותרת לפסקה נוספת</h3>
    <section id="whyToChoose" class="grid">
        <div class="grid" id="p-and-h">
            <p class="editable">תוכן הפסקה</p>
        </div>
        <div id="whyToImg">
            <img src="" alt="תמונת צד לפסקה">
        </div>
    </section>
    <h3 class="editable">כותרת להשארת הודעה</h3>
    <section id="contact">
        <form class="grid">
            <label for="content" class="editable">כותרת לתוכן ההודעה</label>
            <textarea name="content" id="content"></textarea>
            <label for="emailToAnswer" class="editable">כותרת לדואר אלקטרוני</label>
            <input type="email" id="emailToAnswer">
            <button type="submit" class="btns editable" id="leaveMsg">כפתור לשליחת ההודעה</button>
        </form>
    </section>
    <h3 class="editable">הרשמה לניוזלטר</h3>
    <section id="newsletterSubscription">
        <form class="grid">
            <label for="email">Email</label>
            <input type="email" id="email" name="email">
            <button type="submit" class="btns editable" id="subscribe">כפתור להרשמה</button>
        </form>
    </section>
    </section>`;
        template2 = `<section id="landingPage"><section id="hero" class="grid">
        <div id="callToAction" class="grid">
            <h1 class="editable">כותרת</h1>
            <p class="editable">
            תוכן הפסקה
            </p>
            <span class="editable">משפט נוסף</span>
            <button class="btns editable" id="forMoreBtn">כפתור הנעה לפעולה</button>
        </div>
        <img id="logo" src="" alt="לוגו">
    </section>
    <h3 id="timerH3" class="editable">כותרת משנית</h3>
    <section id="timer">
        <img src="" alt="תמונה">
        <h3 id="timerValue" class="editable">תוכן טקסטואלי על גבי תמונה</h3>
    </section>
    <section id="imageAndP" class="grid">
        <div>
        <img id="imgp1" src="" alt="תמונה 1">
        <p class="editable">תוכן 1</p>
        </div>
        <div>
        <img id="imgp2" src="" alt="תמונה 2">
        <p class="editable">תוכן 2</p>
        </div>
        <div>
        <img id="imgp3" src="" alt="תמונה 3">
        <p class="editable">תוכן 3</p>
        </div>
    </section>
    <h3 class="editable">כותרת לפסקה נוספת</h3>
    <section id="whyToChoose" class="grid">
        <div class="grid" id="p-and-h">
            <p class="editable">תוכן הפסקה</p>
        </div>
        <div id="whyToImg">
            <img src="" alt="תמונת צד לפסקה">
        </div>
    </section>
    <h3 class="editable">כותרת להשארת הודעה</h3>
    <section id="contact">
        <form class="grid">
            <label for="content" class="editable">כותרת לתוכן ההודעה</label>
            <textarea name="content" id="content"></textarea>
            <label for="emailToAnswer" class="editable">כותרת לדואר אלקטרוני</label>
            <input type="email" id="emailToAnswer">
            <button type="submit" class="btns editable" id="leaveMsg">כפתור לשליחת ההודעה</button>
        </form>
    </section>
    <h3 class="editable">הרשמה לניוזלטר</h3>
    <section id="newsletterSubscription">
        <form class="grid">
            <label for="email">Email</label>
            <input type="email" id="email" name="email">
            <button type="submit" class="btns editable" id="subscribe">כפתור להרשמה</button>
        </form>
    </section></section>`;
        if (templateNumber === 1)
            return template1;
        if (templateNumber === 2)
            return template2;
    }
    else {
        template1 = `<section id="newsLetter">
        <div id="hero">
            <div class="grid" id="logoh1">
                <h1 class="editable">כותרת ראשית</h1>
                <img id="logo" src="" alt="תמונת לוגו">
            </div>
            <img id="heroImg" src="" alt="תמונה הירו">
                    </div>
            <div id="cta">
                <h3 class="editable">היי, שם הלקוח</h3>
                <p class="editable">
                תוכן הפסקה
                </p>
                <h4 class="editable">כותר לבולט ליסט</h4>
                <ul>
                    <li class="editable">בולט 1</li>
                    <li class="editable">בולט 2</li>
                    <li class="editable">בולט 3</li>
                    <li class="editable">בולט 4</li>
                    <li class="editable">בולט 5</li>
                </ul>
                <button class="btns editable" >לרכישת המנוי</button>
            </div>
            <div id="contact">
                <h3 class="editable">יצירת קשר</h3>
                <p class="editable">
                    הוראות ליצירת קשר
                </p>
            </div>
            <div id="subscribe">
                <h3 class="editable">הזמנה להירשם לניוזלט</h3>
                <button class="btns editable" >כפתור הרשמה</button>
                <p class="editable">
                פסקת תודה
                </p>
            </div></section>
        `
        return template1;
    }
}

//the function stores and returns the needed stlye properties
function getStyleTemplate() {
    let template;
    if (window.location.href.includes(`landing`)) {
        template = `

body {
    width: 100%;
}

body>* {
    max-width: 100%;
}

.grid {
    display: grid;
}

table,
tr,
td,
th {
    border-collapse: collapse;
    border: 1px solid;
}

section {
    margin-bottom: 32px;
}

h3 {
    width: max-content;
    margin-inline: auto;
}

#logo {
    position: relative;
    width: 30%;
    right: 55%;
    top: 3%;
}

#hero {
    margin-top: 0;
    grid-template-columns: 2fr 1fr;
    background-repeat: no-repeat;
    background-size: cover;
    height: 500px;
}

#callToAction {
    width: max-content;
    height: max-content;
    margin: auto;
    text-align: center;
}

#callToAction>* {
    padding: 8px;
    margin: auto;
}

#callToAction button {
    margin-bottom: 12px;
}

.btns {
    border-radius: 20px;
    margin-inline: auto;
    margin-bottom: 16px;
    border: none;
    height: max-content;
    border: 1px solid;
    width: max-content;
    padding: 6px;
}

.btns:hover {
    border: 1px solid white;
}

#plans {
    width: 70%;
    margin-inline: auto;
}

#plans table {
    margin-inline: auto;
    width: 100%;
}

#plans td {
    padding-inline: 8px;
}

#plans img {
    width: 25px;
}

.imgTd {
    text-align: center;
}

#whyToChoose {
    grid-template-columns: 2fr 1fr;
    height: max-content;
}

#whyToChoose h4,
#whyToChoose p {
    padding: 16px;
}

#p-and-h {
    grid-template-rows: 1fr 4fr;
}

#whyToImg {
    width: 100%;
    height: 100%;
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: 0 60%;
}

#whyToImg img {
    display: none;
}

#contact {
}

#contact form label {
    width: max-content;
    margin-inline: auto;
}

#contact form>* {
    margin-block: 4px;
}

#content {
    width: 35%;
    margin-inline: auto;
    height: 120px;
}

#emailToAnswer {
    width: 35%;
    margin-inline: auto;
    height: 45px;
}

#newsletterSubscription form>* {
    margin-block: 4px;
}

#newsletterSubscription {
    text-align: center;
}

#newsletterSubscription input {
    width: 35%;
    margin-inline: auto;
    height: 45px;
}

#timer {
    position: relative;
    width: 100%;
    height: 100%;
}

#timer img {
    width: 100%;
    height: auto;
}

#timerValue {
    position: absolute;
    width: max-content;
    height: max-content;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}

#pop-up {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    height: max-content;
    width: 50%;
    border: 1px solid white;
}
#pop-up>*{
    margin-block: 8px;

}
 #imageAndP{
            grid-template-columns: 1fr 1fr 1fr;
            text-align: center;
        }
            #imageAndP img{
            width: 100%;
            }
@media (min-width: 768px) and (max-width: 1023px) {

    #hero {
        height: max-content;
    }

    #callToAction {
        height: max-content;
        margin: 0;
    }

}

@media(max-width:767px) {
    body {
        font-size: 1rem;
        text-align: center;
    }

    body>* {
        padding: 4px;
    }

    #hero {
        grid-template-areas: "1 2";
        grid-template-columns: 1fr 1fr;
        height: 70vh;
    }

    #logo {
        grid-area: 1;
        grid-column: span 2;
        position: static;
        width: 80px;
        margin-inline: auto;
        height: max-content;
    }

    #callToAction {
        grid-area: 2;
        padding: 0;
        margin: 0 auto;
        grid-column: span 2;
    }

    #timerValue {
        top: 30%;
    }

    #plans {
        width: 100%;
    }

    #whyToChoose {
        background-image: none;
        height: max-content;
    }

    #p-and-h {
        text-align: center;
        grid-column: span 2;
    }

    #p-and-h p {
        margin-top: 16px;
    }

    #whyToImg {
        grid-column: span 2;
        background-image: none;
    }

    #whyToImg img {
        display: block;
        width: 100%;
        height: 100%;
    }

    #content {
        width: 60%;
        margin-inline: auto;
        height: 120px;
    }

    #emailToAnswer {
        width: 60%;
        margin-inline: auto;
        height: 30px;
    }

    #newsletterSubscription form>* {
        margin-block: 4px;
    }

    #newsletterSubscription {
    }

    #newsletterSubscription input {
        width: 60%;
        margin-inline: auto;
        height: 30px;
    }
 #imageAndP{
            display: block;
            text-align: center;
        }
}
       `;
    }
    else {
        template = `

body {
    
}

.grid {
    display: grid;
}

#newsLetter {
    width: 653px;
    margin-inline: auto;
    text-align: center;
}
#cta>*{
    margin-bottom: 16px;
}
#heroImg {
    width: 100%;
}
#hero{
    max-height: 475px;
    overflow: hidden;
}
#logoh1 {
    grid-template-columns: 2fr 1fr;
    text-align: center;
    margin-bottom: 8px;
    padding-top: 8px;
}

#logoh1 h1 {
    margin-top: 20px;
}

#logo {
    width: 50%;
    margin-inline: auto;
}

.btns {
    border-radius: 20px;
    margin-inline: auto;
    margin-bottom: 16px;
    border: none;
    height: max-content;
    font-size: var(--fSize);
    border: 1px solid;
    width: max-content;
    padding: 6px;
}

.btns:hover {
    border: 1px solid white;
}
#contact>*{
    margin-bottom: 16px;
}
ul {
    width: max-content;
}

ul li {
    margin-right: 84px;
    margin-bottom: 10px;
    width: max-content;
}`;
    }
    return template;
}

//changes icon in table element of landing page
function changeIcon(event) {
    let input = event.target;
    let select = document.querySelector(`#icon`);
    select.value = ``;
    let editables = document.querySelectorAll(`.editable`);
    editables.forEach(edit => {
        if (edit !== input && edit.addTdIcon) {
            select.removeEventListener(`change`, edit.addTdIcon);
        }
    });
    input.addTdIcon = addTdIcon;
    function addTdIcon(ev) {
        let src = ev.target.value;
        input.innerHTML = `<img src="${src}" alt="">`;
    }
    select.addEventListener(`change`, addTdIcon);
}


/**
 * The function `editText` handles editing text content and styling properties based on the event
 * target and the current URL.
 * @param event - The `event` parameter in the `editText` function represents the event that triggered
 * the function, such as a keyup event or a change event. It contains information about the event, such
 * as the target element that triggered the event and any associated data.
 */
function editText(event) {
    event.preventDefault();
    if (window.location.href.includes(`banner`)) {
        let input = event.target;
        let value = input.value;
        let p = document.querySelector(getTextId(input));
        let name;
        if (isNaN(p.id[p.id.length - 1]))
            name = document.querySelector(`#text-name`)
        else name = document.querySelector(`#text-name${p.id[p.id.length - 1]}`);
        let nameContent = value.split(` `);
        name.innerHTML = nameContent[0];
        p.innerHTML = value;
    }
    else {
        let element = event.target;
        let editables = document.querySelectorAll(`.editable`);
        let inputTxt = document.querySelector(`#txtContent`);
        let inputSize = document.querySelector(`#font-size`);
        let inputClr = document.querySelector(`#txtClr`);
        let inputFont = document.querySelector(`#font-family`);
        inputTxt.value = ``;
        inputSize.value = `16px`;
        inputFont.value = `Arial`;
        editables.forEach(edit => {
            if (edit !== element && edit.updateTxt) {
                inputTxt.removeEventListener(`keyup`, edit.updateTxt);
            }
            if (edit !== element && edit.setFont) {
                inputSize.removeEventListener(`change`, edit.setFont);
            }
            if (edit !== element && edit.setClr) {
                inputClr.removeEventListener(`change`, edit.setClr);
            }
            if (edit !== element && edit.setFontFamilyInner)
                inputFont.removeEventListener(`change`, edit.setFontFamilyInner);
        });
        function setFontFamilyInner(ev) {
            let value = ev.target.value;
            element.style.fontFamily = value;
        }
        function updateTxt(ev) {
            let value = ev.target.value;
            element.innerHTML = value;
        }
        function setFontSize(ev) {
            let value = ev.target.value;
            element.style.fontSize = value;
        }
        function setClr(ev) {
            let value = ev.target.value;
            element.style.color = value;
        }
        element.updateTxt = updateTxt;
        element.setFontSize = setFontSize;
        element.setClr = setClr;
        inputFont.addEventListener(`change`, setFontFamilyInner);
        inputClr.addEventListener(`change`, setClr);
        inputSize.addEventListener(`change`, setFontSize);
        inputTxt.addEventListener(`keyup`, updateTxt);
    }
}

/**
 * The function `chooseStyle` dynamically updates the webpage's style and content based on the URL and
 * user interactions.
 */
function chooseStyle() {
    let section = document.createElement(`section`);
    section.id = `wrapper`;
    let style = document.createElement(`style`);
    let main = document.querySelector(`#main`);
    if (document.querySelector('head style')) {
        document.querySelector('head style').remove();
    }
    if (location.href.includes(`news`)) {
        if (document.querySelector(`#newsLetter`))
            document.querySelector(`#newsLetter`).remove();
        section.innerHTML = getHtmlTemplate(3);
        style.innerHTML = getStyleTemplate();
        main.appendChild(section);
    }
    else {
        if (document.querySelector(`#landingPage`))
            document.querySelector(`#landingPage`).remove();
        style.innerHTML = getStyleTemplate();
        section.innerHTML = getHtmlTemplate(1);
        main.appendChild(section);
        let templateBtns = document.querySelectorAll(`#chooseTemplate button`);
        templateBtns.forEach(btn => {
            btn.addEventListener(`click`, (event) => {
                event.preventDefault();
                if (btn.id.includes(`1`))
                    section.innerHTML = getHtmlTemplate(1);
                else section.innerHTML = getHtmlTemplate(2);
                setLPandNLeditorsEventListeners();
            });
        });
    }
    document.querySelector(`head`).appendChild(style);
    setLPandNLeditorsEventListeners();
}

/**
 * The function `bannerEvenetListeners` adds event listeners to various input elements based on their
 * type and id.
 */
function bannerEvenetListeners() {
    let inputs = document.querySelectorAll(`#tools input, #tools select, #tools button, #saver button`);
    inputs.forEach(input => {
        if (input.type === `radio`)
            input.addEventListener(`change`, setbannerSize);
        if (input.id.includes(`text-content`))
            input.addEventListener(`keyup`, editText);
        if (input.id.includes(`pos`))
            input.addEventListener(`input`, moveElement);
        if (input.id.includes(`Clr`))
            input.addEventListener(`change`, changeElementClr);
        if (input.type === `file`) {
            if (input.id.includes(`bgImgFile`) || input.id.includes(`addImgFile`))
                input.addEventListener(`change`, addImg);
        }
        if (input.id.includes(`ImgFromLink`)) {
            input.addEventListener(`click`, addImg);
        }
        if (input.id.toLowerCase().includes(`size`))
            input.addEventListener(`input`, changeElementSize);
        if (input.id.includes(`remove`))
            input.addEventListener(`click`, removeImg);
        if (input.id.includes(`addNewImg`))
            input.addEventListener(`click`, addNewImageBox);
        if (input.id.includes(`add-text-field`))
            input.addEventListener(`click`, createNewTextBox);
        if (input.id.includes(`resetToDefaults`))
            input.addEventListener(`click`, resetToDefaults);
        if (input.id.includes(`downloadAsCode`))
            input.addEventListener(`click`, downloadAsCode);
        if (input.id.includes(`saveOnPage`))
            input.addEventListener(`click`, saveOnPage);
        if (input.id.includes(`font-family`))
            input.addEventListener(`change`, setFontFamily);
    });
}

/**
 * The function `setbannerSize` takes an event input, extracts width and height values from a string,
 * and sets the width and height of a banner element accordingly.
 * @param event - The `event` parameter in the `setbannerSize` function is an event object that
 * represents an event being handled, such as a user input event. It contains information about the
 * event, such as the target element that triggered the event.
 */
function setbannerSize(event) {
    let input = event.target;
    let value = input.value;
    let [width, height] = value.split(`-`);
    let banner = document.querySelector(`#banner`);
    banner.style.width = width;
    banner.style.height = height;
}

/**
 * The function `getTextId` takes an input element and returns the corresponding text box identifier
 * based on the input's id.
 * @param input - The `input` parameter is an object that contains an `id` property.
 * @returns The function `getTextId` takes an input object and returns a string based on the identifier
 * of the input's id property. If the identifier is not a number, it returns `#text-box`, otherwise it
 * returns `#text-box` followed by the identifier.
 */
function getTextId(input) {
    let identifier = input.id[input.id.length - 1];
    if (isNaN(identifier))
        return `#text-box`;
    else return `#text-box${identifier}`;
}

/**
 * The function `getImgId` takes an input and returns the corresponding image identifier based on the
 * input's id.
 * @param input - The `input` parameter in the `getImgId` function is expected to be an object
 * representing an HTML element, specifically an image element.
 * @returns The function `getImgId` takes an input and returns a string. If the last character of the
 * input's id is a number, it returns `#img` followed by that number. If the last character is not a
 * number, it simply returns `#img`.
 */
function getImgId(input) {
    let identifier = input.id[input.id.length - 1];
    if (isNaN(identifier))
        return `#img`;
    else return `#img${identifier}`;
}

/**
 * The function `setFontFamily` sets the font family of a paragraph element based on the value of an
 * input element if the current URL includes the word "banner".
 * @param event - The `event` parameter is an object that represents an event that occurs in the DOM,
 * such as a user action like clicking a button or submitting a form. In this context, it is likely
 * referring to an event that is triggered when a user interacts with an input element, such as typing
 * in a
 */
function setFontFamily(event) {
    let input = event.target;
    let value = input.value;
    if (location.href.includes(`banner`)) {
        let p = document.querySelector(getTextId(input));
        p.style.fontFamily = value;
    }
}

/**
 * The function `addFontsAndSizes` dynamically populates font family and font size options in a select
 * element in a web page.
 */
function addFontsAndSizes() {
    let fontSizeSelect = document.querySelector(`#font-size`);
    let fonts = document.querySelector(`#font-family`);
    globlas.fonts.forEach(font => {
        let opt = document.createElement(`option`);
        opt.value = font;
        opt.innerHTML = font;
        opt.style.fontFamily = font;
        fonts.appendChild(opt);
    });
    for (let i = 2; i <= 64; i += 2) {
        let opt = document.createElement(`option`);
        let value = `${i}px`;
        opt.value = value;
        opt.innerHTML = value;
        fontSizeSelect.appendChild(opt);
        if (i === 16)
            opt.selected = true;
    }
}

/**
 * The `moveElement` function updates the position of an element based on user input, adjusting either
 * background position or element position.
 * @param event - The `event` parameter in the `moveElement` function represents the event that
 * occurred, such as a user input event like typing in a text box or clicking a button. It contains
 * information about the event, including the target element that triggered the event.
 */
function moveElement(event) {
    let input = event.target;
    let value = input.value + `%`;
    let element;
    if (input.id.includes(`bg`)) {
        element = document.querySelector(`#banner`);
        if (input.id.includes(`ver`))
            element.style.backgroundPositionX = value;
        else
            element.style.backgroundPositionY = value;
    }
    else {
        if (input.id.includes(`text`))
            element = document.querySelector(getTextId(input));
        else element = document.querySelector(getImgId(input));
        if (input.id.includes(`hor`))
            element.style.right = value;
        else element.style.top = value;
    }
}

/**
 * The function `changeElementClr` changes the background color or font color of an element based on
 * user input.
 * @param event - The `event` parameter is an object that represents an event that occurs in the DOM
 * (Document Object Model), such as a user interaction like a click or input change. It contains
 * information about the event, such as the target element that triggered the event.
 */
function changeElementClr(event) {
    let input = event.target;
    let val = input.value;
    let element;
    if (window.location.href.includes(`banner`)) {
        if (input.id.toLowerCase().includes(`bg`)) {
            if (input.id.includes(`font`))
                element = document.querySelector(getTextId(input));
            else element = document.querySelector(`#banner`);
            element.style.backgroundColor = val;
        }
        else {
            element = document.querySelector(getTextId(input));
            element.style.color = val;
        }
    }
    else {
        let elementString = document.querySelector(`#chooseElement-clr`).value;
        if (elementString === `.btns`) {
            let btns = document.querySelectorAll(elementString);
            btns.forEach(btn => {
                btn.style.backgroundColor = val;
            });
        }
        else {
            element = document.querySelector(elementString);
            element.style.backgroundColor = val;
        }
    }
}

/**
 * The function `addImg` is used to handle adding images to a webpage, either as background images or
 * image elements.
 * @param event - The `event` parameter in the `addImg` function is an event object that represents the
 * event that was triggered when the function is called. It is typically an event like a click, change,
 * or submit event that is associated with an HTML element. In this case, the function is used to
 */
function addImg(event) {
    event.preventDefault();
    let input = event.target;
    if (window.location.href.includes(`banner`)) {
        let banner = document.querySelector(`#banner`);
        if (input.id.includes(`File`)) {
            let img = input.files[0];
            let reader = new FileReader();
            let imgElem;
            reader.onload = function (eventLoad) {
                imgElem = document.querySelector(getImgId(input));
                let src = eventLoad.target.result;
                if (input.id.includes(`bg`)) {
                    banner.style.backgroundImage = `url(${src})`;
                }
                else {
                    imgElem.src = src;
                }
            };
            reader.readAsDataURL(img);
        }
        else {
            let img = document.querySelector(getImgId(input));
            let src;
            if (isNaN(input.id[input.id.length - 1]))
                src = document.querySelector(`#ImgLink`).value
            else src = document.querySelector(`#ImgLink${input.id[input.id.length - 1]}`).value;
            if (input.id.includes(`Bg`)) {
                src = document.querySelector(`#bgImgLink`).value;
                banner.style.backgroundImage = `url(${src})`;
            }
            else
                img.src = src;
        }
    }
    else {
        let elementString = document.querySelector(`#chooseElement-img`).value;
        let element = document.querySelector(elementString);
        if (input.id.includes(`File`)) {
            let img = input.files[0];
            let reader = new FileReader();
            reader.onload = function (eventLoad) {
                let src = eventLoad.target.result;
                if (elementString.includes(`hero`)) {
                    if (window.location.href.includes(`landing`))
                        element.style.backgroundImage = `url(${src})`;
                    else element.src = src;
                }
                else if (elementString.includes(`whyToImg`)) {
                    element.style.backgroundImage = `url(${src})`;
                    element.src = src;
                }
                else element.src = src;
            };
            reader.readAsDataURL(img);
        }
        else {
            let src = document.querySelector(`#addImgLink`).value;
            if (elementString.includes(`hero`)) {
                if (window.location.href.includes(`landing`))
                    element.style.backgroundImage = `url(${src})`;
                else element.src = src;
            }
            else if (elementString.includes(`whyToImg`)) {
                element.style.backgroundImage = `url(${src})`;
                element.src = src;
            }
            else element.src = src;
        };
    }
}


/**
 * The function `changeElementSize` dynamically adjusts the size of different elements on a webpage
 * based on user input.
 * @param event - The `event` parameter in the `changeElementSize` function represents the event that
 * occurred, such as a user input event like typing in an input field or clicking a button. It contains
 * information about the event, including the target element that triggered the event.
 */
function changeElementSize(event) {
    let input = event.target;
    let value = input.value;
    let element;
    if (input.id.includes(`bg`)) {
        element = document.querySelector(`#banner`);
        element.style.backgroundSize = value + `%`;
    }
    else if (input.id.includes(`img`)) {
        element = document.querySelector(getImgId(input));
        element.style.width = value + `%`;
    }
    else if (input.id.includes(`text-box`)) {
        element = document.querySelector(getTextId(input));
        element.style.border = `1px solid black`;
        element.style.width = value + `%`;
        input.addEventListener(`mouseup`, () => {
            element.style.border = `none`;
        })
    }
    else {
        element = document.querySelector(getTextId(input));
        element.style.fontSize = value;
    }
}

/**
 * The function `removeImg` is used to remove the background image or source of an image element based
 * on the event target.
 * @param event - The `event` parameter in the `removeImg` function is an event object that represents
 * the event that triggered the function. It is typically passed to event handler functions
 * automatically when an event occurs, such as a click or keypress. In this case, the `event` parameter
 * is used to prevent
 */
function removeImg(event) {
    event.preventDefault();
    let input = event.target;
    let element;
    if (input.id.toLowerCase().includes(`bg`)) {
        element = document.querySelector(`#banner`);
        element.style.backgroundImage = ``;
    }
    else {
        element = document.querySelector(getImgId(input));
        element.src = ``;
    }
}

/**
 * The function `addNewImageBox` creates a new form element with an image and appends it to the DOM,
 * while also updating the global variable `numOfImg`.
 * @param event - The `event` parameter in the `addNewImageBox` function is an event object that
 * represents the event that triggered the function. In this case, it is used to prevent the default
 * behavior of a form submission using `event.preventDefault()`.
 */
function addNewImageBox(event) {
    event.preventDefault();
    let user = JSON.parse(localStorage.getItem(`currentUser`));
    let users = JSON.parse(localStorage.getItem(`users`));
    let form = document.querySelector(`#images`);
    let newForm = document.createElement(`form`);
    let newImg = document.createElement(`img`);
    let identifier = user.numOfImg;
    newImg.id = `img${identifier}`;
    newForm.id = `#images${identifier}`;
    newForm.classList.add(`grid`);
    newForm.classList.add(`imagesClass`);
    let childElements = form.childNodes;
    childElements.forEach(element => {
        let tempClone = element.cloneNode(true);
        tempClone.id = `${element.id}${identifier}`;
        newForm.appendChild(tempClone);
    });
    let tools = document.querySelector(`#tools`);
    tools.insertBefore(newForm, document.querySelector(`#addNewImg`));
    document.querySelector(`#banner`).appendChild(newImg);
    setBannerStyle();
    bannerEvenetListeners();
    user.numOfImg++;
    localStorage.setItem(`currentUser`, JSON.stringify(user));
    users.forEach(us => {
        if (us.userName === user.userName)
            us = user;
    });
    localStorage.setItem(`users`, JSON.stringify(users));
}

/**
 * The `createNewTextBox` function creates a new text box with specific default settings and appends it
 * to the document.
 * @param event - The `event` parameter in the `createNewTextBox` function is an event object that
 * represents the event that triggered the function, such as a button click or form submission. In this
 * case, the function is using `event.preventDefault()` to prevent the default behavior of the event,
 * which is often used
 */
function createNewTextBox(event) {
    event.preventDefault();
    let user = JSON.parse(localStorage.getItem(`currentUser`));
    let users = JSON.parse(localStorage.getItem(`users`));
    let form = document.querySelector(`#text-editor`);
    let newForm = document.createElement(`form`);
    let newP = document.createElement(`p`);
    let identifier = user.numOfTextEdit;
    newP.id = `text-box${identifier}`;
    newForm.id = `#text-editor${identifier}`;
    newForm.classList.add(`grid`);
    newForm.classList.add(`text-editors`);
    let childElements = form.childNodes;
    childElements.forEach(element => {
        let tempClone = element.cloneNode(true);
        tempClone.id = `${element.id}${identifier}`;
        switch (tempClone.id) {
            case `text-name${identifier}`: tempClone.innerHTML = `Text content`;
                break;
            case `text-content${identifier}`: tempClone.value = ``;
                break;
            case `font-family${identifier}`: tempClone.value = `Arial`;
                break;
            case `font-size${identifier}`: tempClone.value = `16px`;
                break;
            case `fontClr${identifier}`: tempClone.value = `0 0 0`;
                break;
            case `fontBgClr${identifier}`: tempClone.value = `0 0 0`;
                break;
            default: tempClone.value = `50%`;
                break;
        }
        newForm.appendChild(tempClone);
    });
    let tools = document.querySelector(`#tools`);
    tools.insertBefore(newForm, document.querySelector(`#customFont-form`));
    document.querySelector(`#banner`).appendChild(newP);
    setBannerStyle();
    bannerEvenetListeners();
    user.numOfTextEdit++;
    localStorage.setItem(`currentUser`, JSON.stringify(user));
    users.forEach(us => {
        if (us.userName === user.userName)
            us = user;
    });
    localStorage.setItem(`users`, JSON.stringify(users));
}

/**
 * The function `resetToDefaults` resets form inputs, selects, text boxes, and images to their default
 * values.
 * @param event - The `event` parameter in the `resetToDefaults` function is typically an event object
 * that represents an event that occurs in the browser, such as a button click or form submission. This
 * parameter allows you to access information about the event that triggered the function, but in the
 * provided code snippet, it
 */
function resetToDefaults(event) {
    event.preventDefault();
    if (window.location.href.includes(`banner`)) {
        let inputs = document.querySelectorAll('input');
        let banner = document.querySelector(`#banner`);
        inputs.forEach(input => {
            if (input.type === 'radio' || input.type === 'checkbox') {
                input.checked = input.defaultChecked;
            }
            else {
                input.value = input.defaultValue;
            }
        });
        let selects = document.querySelectorAll('select');
        selects.forEach(select => {
            select.value = select.defaultValue;
        });
        banner.innerHTML = `<p id="text-box"></p>
            <img id="img">`;
        banner.style.backgroundImage = ``;
        banner.style.backgroundColor = '#FFFFFF';
        setBannerStyle();
    }
    else if (window.location.href.includes(`news`)) {
        if (document.querySelector(`head style`))
            document.querySelector(`head style`).remove();
        if (document.querySelector(`#newsLetter`))
            document.querySelector(`#newsLetter`).remove();
        if (document.querySelector(`#wrapper`))
            document.querySelector(`#wrapper`).remove();
        chooseStyle();
        setLPandNLeditorsEventListeners();
    }
    else {
        if (document.querySelector(`head style`))
            document.querySelector(`head style`).remove();
        if (document.querySelector(`#landingPage`))
            document.querySelector(`#landingPage`).remove();
        if (document.querySelector(`#wrapper`))
            document.querySelector(`#wrapper`).remove();
        chooseStyle();
        setLPandNLeditorsEventListeners();
    }
}

/**
 * The `downloadAsCode` function generates an HTML file containing the content and styles of a
 * specified banner element and initiates its download when triggered by an event.
 * @param event - The `event` parameter is an event object that represents an event that occurs in the
 * browser, such as a click event on a button or a form submission event. In the context of the
 * `downloadAsCode` function, it is used to prevent the default behavior of an event, which is
 * typically
 */
function downloadAsCode(event) {
    event.preventDefault();
    let element;
    if (window.location.href.includes(`banner`))
        element = document.querySelector(`#banner`);
    if (window.location.href.includes(`landing`)) {
        element = document.querySelector(`#landingPage`);
        element.style.width = `100%`;
    }
    if (window.location.href.includes(`news`)) {
        element = document.querySelector(`#newsLetter`);
        element.style.width = `100%`;
    }
    let htmlContent = element.outerHTML;
    let completePage = makeHtmlElement(htmlContent);
    let blob = new Blob([completePage], { type: 'text/html' });
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'banner.html';
    link.click();
}


/**
 * The function `makeHtmlElement` generates an HTML element based on the current URL and provided
 * content.
 * @param htmlContent - The `htmlContent` parameter in the `makeHtmlElement` function represents the
 * content that you want to include inside the HTML element that will be generated. This content can be
 * any valid HTML code such as text, images, links, or other elements like divs, spans, etc. The
 * function
 * @returns The function `makeHtmlElement` returns an HTML element based on the conditions specified in
 * the function. The returned HTML element will vary depending on the URL of the current window
 * location. If the URL includes "banner", the function will return the `htmlContent` directly. If the
 * URL includes "news", the function will select the element with the id "newsLetter" and set its inner
 * HTML to
 */
function makeHtmlElement(htmlContent) {
    let htmlElement;
    let originCss = getStyleTemplate();
    if (window.location.href.includes(`banner`)) {
        htmlElement = `${htmlContent}`;
    }
    else {
        if (window.location.href.includes(`news`)) {
            htmlElement = document.querySelector(`#newsLetter`);

        }
        else htmlElement = document.querySelector(`#landingPage`);
        htmlElement = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Element</title>
        <style>
        ${originCss}
        </style>
    </head>
    <body dir="rtl">
    ${htmlContent};
    </body>
    </html>`;
    }
    return htmlElement;
}


/**
 * The function `saveOnPage` saves the HTML content of a specific element based on the current page URL
 * and updates the user and current user data in local storage.
 * @param event - The `event` parameter in the `saveOnPage` function is an event object that represents
 * an event being handled by the function. In this case, the function is designed to be called when a
 * form submission event occurs, and the `event` parameter is used to prevent the default behavior of
 * the
 */
function saveOnPage(event) {
    event.preventDefault();
    let element;
    if (window.location.href.includes(`banner`))
        element = document.querySelector(`#banner`);
    if (window.location.href.includes(`landing`))
        element = document.querySelector(`#landingPage`);
    if (window.location.href.includes(`news`))
        element = document.querySelector(`#newsLetter`);
    let htmlContent = element.outerHTML;
    let users = JSON.parse(localStorage.getItem(`users`));
    let currentUser = JSON.parse(localStorage.getItem(`currentUser`));
    users.forEach(us => {
        if (us.userName === currentUser.userName) {
            if (window.location.href.includes(`banner`)) {
                us.banner = htmlContent;
                currentUser.banner = htmlContent;
            }
            if (window.location.href.includes(`landing`)) {
                us.landingPage = htmlContent;
                currentUser.landingPage = htmlContent;
            }
            if (window.location.href.includes(`news`)) {
                us.newsLetter = htmlContent;
                currentUser.newsLetter = htmlContent;
            }
        }
    });
    localStorage.setItem(`users`, JSON.stringify(users));
    localStorage.setItem(`currentUser`, JSON.stringify(currentUser));
}

/**
 * The function `updateElement` retrieves user-specific HTML elements from local storage and updates
 * corresponding elements on different pages based on the current URL.
 */
function updateElement() {
    let element;
    let storedElement;
    let currentUser = JSON.parse(localStorage.getItem(`currentUser`));
    if (window.location.href.includes(`banner`)) {
        element = document.querySelector(`#banner`);
        storedElement = currentUser.banner;
        if (storedElement != null)
            element.outerHTML = storedElement;
    }
    if (window.location.href.includes(`landing`)) {
        let storedElement = currentUser.landingPage;
        element = document.querySelector(`#landingPage`);
        if (storedElement != null)
            element.outerHTML = storedElement;
    }
    if (window.location.href.includes(`news`)) {
        storedElement = currentUser.newsLetter;
        element = document.querySelector(`#newsLetter`);
        if (storedElement != null)
            element.outerHTML = storedElement;
    }
}

/**
 * The function `setBannerStyle` sets specific default CSS styles for a banner element and its children.
 */
function setBannerStyle() {
    let banner = document.querySelector(`#banner`);
    banner.style.position = `relative`;
    banner.style.placeSelf = `center`;
    banner.style.backgroundRepeat = `no-repeat`;
    banner.style.overflow = `hidden`;
    let children = banner.children;
    Array.from(children).forEach(child => {
        child.style.position = `absolute`;
        if (child.nodeName === `P`) {
            child.style.wordBreak = 'break-word';
            child.style.overflowWrap = 'break-word';
            child.style.width = 'max-content';
        }
    });
}
