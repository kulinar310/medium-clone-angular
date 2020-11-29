import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { logoutAction } from "src/app/auth/store/actions/sync.action";
import { updateCurrentUserAction } from "src/app/auth/store/actions/updateCurrentUSer.action";
import { currentUserSelector } from "src/app/auth/store/selectors";
import { BackendErrorsInterface } from "src/app/auth/types/backendErrors.interface";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { CurrentUserInputInterface } from "src/app/shared/types/currentUserInput.interface";
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from "../../store/selectors";

@Component({
  selector: "mc-settings",
  templateUrl: "./settings.component.html",
})
export class SettingsComponent implements OnInit, OnDestroy {
  currentUser: CurrentUserInterface;
  currrentUserSubscription: Subscription;
  form: FormGroup;
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface | null>;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeListeners();
  }

  ngOnDestroy(): void {
    this.initializeValues();
    this.currrentUserSubscription.unsubscribe();
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  initializeListeners(): void {
    this.currrentUserSubscription = this.store
      .pipe(select(currentUserSelector), filter(Boolean))
      .subscribe((currentUser: CurrentUserInterface) => {
        this.currentUser = currentUser;
        this.initializeForm();
      });
  }

  initializeForm(): void {
    this.form = this.fb.group({
      image: this.currentUser.image,
      username: this.currentUser.username,
      bio: this.currentUser.bio,
      email: this.currentUser.email,
      password: "",
    });
  }

  submit(): void {
    const currentUserInput: CurrentUserInputInterface = {
      ...this.currentUser,
      ...this.form.value,
    };
    this.store.dispatch(updateCurrentUserAction({ currentUserInput }));
  }

  logout(): void {
    this.store.dispatch(logoutAction());
  }
}