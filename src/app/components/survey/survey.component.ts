import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SurveyService } from '../../services/survey.service';
import { Survey } from '../../models/survey';

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
        this.survey.device = "web site";
    }

    public changedValue(param, value) {
        this.survey[param] = value;
        console.log(this.survey);
    }

    public addOrRemoveValue(value) {
        console.log(value);
        if (this.survey.question2 === undefined || this.survey.question2 === null) {
            this.survey.question2 = [];
        }
        var index = this.survey.question2.indexOf(value);
        if (index !== -1) {
            this.survey.question2.splice(index, 1);
        } else {
            this.survey.question2.push(value);
        }
        console.log(this.survey.question2);
    }

    public changeValueMultiQuestion(index, value) {
        this.survey.question9[index] = value;
        console.log(this.survey.question9);
    }

    public valid() {
        console.log(this.survey);
        for (let i = 0; i < 10; i += 1) {
            this.alert[i] = false;
        }
        if (this.survey.question1 === undefined || this.survey.question1 === null) {
            this.alert[0] = true;
        }
        if (this.survey.question2 === undefined || this.survey.question2 === null) {
            this.alert[1] = true;
        }
        if (this.survey.question3 === undefined || this.survey.question3 === null) {
            this.alert[2] = true;
        }
        if (this.survey.question4 === undefined || this.survey.question4 === null) {
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
        if (this.survey.question8 === undefined || this.survey.question8 === null) {
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
                console.log(this.alert);
                alert("Merci de renseigner les champs");
                return;
            }
        }
        this.surveyService.add(this.survey)
        .subscribe(
            results => {
                console.log(results);
            }
        );
        alert("Merci d'avoir rempli ce formulaire");
    }
}
