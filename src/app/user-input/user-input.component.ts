import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent {
  @Input() initialInvestment!: Number;
  @Input() annualInvestment!: Number;
  @Input() expectedReturn!: Number;
  @Input() duration!: Number;
  @Output() outputAnnualReturn = new EventEmitter<{
    year: number;
    interest: number;
    valueEndOfYear: number;
    annualInvestment: number;
    totalInterest: number;
    totalAmountInvested: number;
  }[]>();
  enteredInitialInvestment = 0;
  enteredAnnualInvestment = 0;
  enteredExpectedReturn = 0;
  enteredDuration = 0;

  calculatedReturn() {
    let initialInvestment = this.enteredInitialInvestment;
    let annualInvestment = this.enteredAnnualInvestment;
    let expectedReturn = this.enteredExpectedReturn;
    let duration = this.enteredDuration;

    const annualData = [];
    let investmentValue = initialInvestment;

    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest =
        investmentValue - annualInvestment * year - initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
      });
    }
    console.log('Annual Data', annualData);
    this.outputAnnualReturn.emit(annualData);
    return annualData;
  }
}
