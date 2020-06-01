import { State, Selector, StateContext } from '@ngxs/store';
import { Receiver, EmitterAction } from '@ngxs-labs/emitter';
import { Injectable } from '@angular/core';
import { ICompany } from '../models/company.model';
import { IProduct } from '../models/product.model';
import { IClient } from '../models/client.model';
import { IBilling } from '../models/billing-extended.model';

export interface CompanyStateModel {
  active: boolean;
  company: ICompany;
  // productList: IProduct[];
  // clientList: IClient[];
  billingList: IBilling[];
}

@State<CompanyStateModel[]>({
  name: 'company',
  defaults: [],
})
@Injectable()
export class CompanyState {
  constructor() {}

  @Selector()
  static activeCompany(state: CompanyStateModel[]): ICompany {
    return state.find((item) => item.active).company;
  }

  // @Selector()
  // static clientList(state: CompanyStateModel[]): IClient[] {
  //   return state.find((item) => item.active).clientList;
  // }

  // @Selector()
  // static productList(state: CompanyStateModel[]): IProduct[] {
  //   return state.find((item) => item.active).productList;
  // }

  @Selector()
  static billingList(state: CompanyStateModel[]): IBilling[] {
    return state.find((item) => item.active).billingList;
  }

  @Receiver()
  public static setActiveCompany(
    { setState, getState }: StateContext<CompanyStateModel[]>,
    { payload }: EmitterAction<ICompany>
  ) {
    const state = getState();
    const newState = state.map((item) => {
      return {
        ...item,
        active: false,
      };
    });
    const index = newState.findIndex(
      (item) => item.company.ruc === payload.ruc
    );
    if (index === -1) {
      newState.push({
        active: true,
        billingList: [],
        company: payload,
      });
    } else {
      newState[index].active = true;
    }
    setState(newState);
  }

  // @Receiver()
  // public static addClient(
  //   { setState, getState }: StateContext<CompanyStateModel[]>,
  //   { payload }: EmitterAction<IClient>
  // ) {
  //   const state = getState();
  //   const index = state.findIndex((item) => item.active);
  //   state[index].clientList.push(payload);
  //   setState(state);
  // }

  // @Receiver()
  // public static addProduct(
  //   { setState, getState }: StateContext<CompanyStateModel[]>,
  //   { payload }: EmitterAction<IProduct>
  // ) {
  //   const state = getState();
  //   const index = state.findIndex((item) => item.active);
  //   state[index].productList.push(payload);
  //   setState(state);
  // }

  @Receiver()
  public static addBilling(
    { setState, getState }: StateContext<CompanyStateModel[]>,
    { payload }: EmitterAction<IBilling>
  ) {
    const state = getState();
    const index = state.findIndex((item) => item.active);
    state[index].billingList.push(payload);
    setState(state);
  }
}
