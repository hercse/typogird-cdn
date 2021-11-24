import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, set, update, push, remove, child, onValue } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
var project_original = "";
fetch('hercs.art/subdomain/keyyyy.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        project_original = myJson;
    }).then(() => {
        const LetStartIt = {
            apiKey: atob(project_original.apiKey),
            authDomain: atob(project_original.authDomain),
            databaseURL: atob(project_original.databaseURL),
            projectId: atob(project_original.projectId),
            storageBucket: atob(project_original.storageBucket),
            messagingSenderId: atob(project_original.messagingSenderId),
            appId: atob(project_original.appId)
        };

        const app = initializeApp(LetStartIt);
        var project_db = ""
        const subdomain = window.location.hostname.split('.').slice(0, -2).join('.');
        const db = getDatabase();
        const dbRef = ref(db, '/projects/' + subdomain);

        onValue(dbRef, snapshot => {
            // console.log(snapshot.val());
            project_db = snapshot.val();
            console.log(project_db);
            if (project_db.type == "cdoe-page") {
                document.body.outerHTML = project_db.body
                document.head.outerHTML = project_db.head
            }
        });
    });