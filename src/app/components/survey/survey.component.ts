import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SurveyService } from '../../services/survey.service';
import { Survey } from '../../models/survey';
import { Error } from '../../models/error';

@Component({
    moduleId: module.id,
    templateUrl: '../../templates/survey.component.html',
    styleUrls: [ '../../../assets/css/survey.component.css' ],
    selector: 'survey',
    providers: [SurveyService]
})

export class SurveyComponent implements OnInit {
    public survey: Survey = new Survey();
    public alert: boolean[];
    private error: Error = null;
    private selectedApp: string = "site";
    private appDisplay = "site";

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private surveyService: SurveyService) { }

    ngOnInit() {
        this.survey.question9 = [];
        for (let i = 0; i < 4; i += 1) {
            this.survey.question9.push("");
        }
        this.alert = [];
        for (let i = 0; i < 10; i += 1) {
            this.alert.push(false);
        }
        this.survey.device = this.selectedApp;
    }

    public changedValue(param, value) {
        this.survey[param] = value;
    }

    public addOrRemoveValue(value) {
        if (this.survey.question2 === undefined || this.survey.question2 === null) {
            this.survey.question2 = [];
        }
        var index = this.survey.question2.indexOf(value);
        if (index !== -1) {
            this.survey.question2.splice(index, 1);
        } else {
            this.survey.question2.push(value);
        }
    }

    public changeValueMultiQuestion(index, value) {
        this.survey.question9[index] = value;
    }

    public valid() {
        for (let i = 0; i < 10; i += 1) {
            this.alert[i] = false;
        }
        if (this.survey.question1 === undefined || this.survey.question1 === null) {
            this.alert[0] = true;
        }
        if (this.survey.question2 === undefined || this.survey.question2 === null) {
            this.alert[1] = true;
        }
        if (this.selectedApp != 'game' && this.survey.question3 === undefined || this.selectedApp != 'game' && this.survey.question3 === null) {
            this.alert[2] = true;
        }
        if (this.selectedApp != 'game' && this.survey.question4 === undefined || this.selectedApp != 'game' && this.survey.question4 === null) {
            this.alert[3] = true;
        }
        if (this.survey.question5 === undefined || this.survey.question5 === null) {
            this.alert[4] = true;
        }
        if (this.survey.question6 === undefined || this.survey.question6 === null) {
            this.alert[5] = true;
        }
        if (this.survey.question7 === undefined || this.survey.question7 === null) {
            this.alert[6] = true;
        }
        if (this.selectedApp != 'game' && this.survey.question8 === undefined || this.selectedApp != 'game' && this.survey.question8 === null) {
            this.alert[7] = true;
        }
        if (this.survey.question9 === undefined || this.survey.question9 === null) {
            this.alert[8] = true;
        }
        for (let i = 0; i < this.survey.question9.length; i += 1) {
            if (this.survey.question9[i] === "") {
                this.alert[8] = true;
            }
        }

        for (let i = 0; i < this.alert.length; i += 1) {
            if (this.alert[i]) {
                this.error = new Error("Erreur", "Merci de renseigner les champs", 3, true);
                return;
            }
        }
        this.surveyService.add(this.survey)
        .subscribe(
            results => {
                console.log(results);
            }
        );
        this.error = new Error("Succes", "Merci d'avoir rempli ce formulaire", 3, false);
    }

    private changeSelectedApp(name: string) {
        let selectBlock = document.getElementById("button_"+this.selectedApp);
        selectBlock.classList.remove("select");

        this.selectedApp = name;
        selectBlock = document.getElementById("button_"+name);
        selectBlock.classList.add("select");
        if (name === "site") {
            this.appDisplay = "site";
        } else if (name === "app") {
            this.appDisplay = "application mobile";
        } else {
            this.appDisplay = "jeu vidéo";
        }
        this.survey.device = this.selectedApp;
    }
}
