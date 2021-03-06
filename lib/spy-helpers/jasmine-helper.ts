import { SpyHelper } from './spy-helper';

export class JasmineHelper implements SpyHelper {
  getSpy(property: string) {
    return jasmine.createSpy(property);
  }

  // tslint:disable-next-line:ban-types
  spyAndCallFake<T, K extends keyof T>(object: T, key: K, stub: T[K] & Function) {
    const value = object[key];
    const spy = ((jasmine as any).isSpy(value) ? value : spyOn(object, key)) as jasmine.Spy; // tslint:disable-line
    spy.calls.reset();
    spy.and.callFake(stub);
  }

  spyAndCallThrough<T, K extends keyof T>(object: T, key: K) {
    const value = object[key];
    if (typeof value === 'function' && !(jasmine as any).isSpy(value)) { // tslint:disable-line
      spyOn(object, key).and.callThrough();
    }
  }
}
