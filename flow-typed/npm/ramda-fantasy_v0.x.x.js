// @flow

import { CurriedFunction2 } from 'ramda';

declare module 'ramda-fantasy' {
  declare interface IFuture<E, A> {
    fork(reject: (v: E) => void, resolve: (v: A) => void): void;
    ap(f: any): any;
    map<A2>(fb: (e: A) => A2): IFuture<E, A2>;
    bimap<E2, A2>(errFn: (value: E) => E2, successFn: (value: A) => A2): IFuture<E2, A2>;
    chain<A2>(fn: (v: A) => IFuture<E, A2>): IFuture<E, A2>;
    chainReject<A2>(fn: (value: E) => IFuture<E, A2>): IFuture<E, A2>;
  }

  declare interface FutureStatic {
    <E, A>(fn: (reject: (v: E) => void, resolve: (v: A) => void) => void): IFuture<E, A>;
    constructor <E, A>(fn: (reject: (v: E) => void, resolve: (v: A) => void) => void): IFuture<E, A>;
    cache<E, A>(f: IFuture<E, A>): IFuture<E, A>;
    of<E, A>(x: A): IFuture<E, A>;
    reject<E, A>(val: E): IFuture<E, A>;
  }

  declare var Future: FutureStatic;

  declare interface IIO<T> {
    ap<T2, T3>(thatIo: IIO<T2>): IIO<T3>;
    chain<T2>(fn: (value: T) => IIO<T2>): IIO<T2>;
    map<T2>(fn: (value: T) => T2): IIO<T2>;
    runIO(): T;
  }

  declare interface IOStatic {
    <T>(fn: () => T): IIO<T>;
    constructor <T>(fn: () => T): IIO<T>;
    of<T>(x: T): IIO<T>;
    runIO<T>(io: IIO<T>): T;
  }

  declare var IO: IOStatic;

  declare interface IIdentity<T> {
    ap<T2, T3>(app: IIdentity<T2>): IIdentity<T3>;
    chain<T2>(fn: (value: T) => IIdentity<T2>): IIdentity<T2>;
    map<T2>(fn: (value: T) => T2): IIdentity<T2>;
  }

  declare interface IdentityStatic {
    <T>(value: T): IIdentity<T>;
    constructor <T>(value: T): IIdentity<T>;
    of<T>(x: T): IIdentity<T>;
  }

  declare var Identity: IdentityStatic;

  declare interface IEither<L, R> {
    chain<L2, R2, T>(f: (e: IEither<L2, R2>) => T): IEither<L2, T>;
    ap<R2>(f: (e: R) => IEither<L, R2>): IEither<L, R2>;
    extend<L2, R2, T>(f: (e: IEither<L2, R2>) => T): IEither<L2, T>;
    equals<L2, R2>(that: IEither<L2, R2>): boolean;
    bimap<L2, R2>(lf: (value: L) => L2, rf: (value: R) => R2): IEither<L2, R2>;
    map<T>(fn: (e: R) => T): IEither<L, T>;
  }

  declare interface EitherStatic {
    Left<L, R>(value: L): IEither<L, R>;
    Right<L, R>(value: R): IEither<L, R>;
    either<L, R, T>(left: (value: L) => T, right: (value: R) => T, e: IEither<L, R>): T;
    either<L, R, T>(left: (value: L) => T, right: (value: R) => T): (e: IEither<L, R>) => T;
    either<L, R, T>(left: (l: L) => T): CurriedFunction2<(r: R) => T, IEither<L, R>, T>;
    isLeft<L, R>(x: IEither<L, R>): boolean;
    isRight<L, R>(x: IEither<L, R>): boolean;
    of<L, R>(value: R): IEither<L, R>;
  }

  declare var Either: EitherStatic;

  declare interface IMaybe<T> {
    getOrElse(value: T): T;
    map<T2>(fn: (value: T) => T2): IMaybe<T2>;
    ap<T2>(m: IMaybe<T>): IMaybe<T2>;
    chain<T2>(fn: (value: T) => IMaybe<T2>): IMaybe<T2>;
    // reduce(fn: ());
    equals<T2>(m: IMaybe<T2>): boolean;
  }

  declare interface MaybeStatic {
    Just<T>(value: T): IMaybe<T>;
    Nothing<T>(): IMaybe<T>;
    isJust<T>(x: IMaybe<T>): boolean;
    isNothing<T>(x: IMaybe<T>): boolean;
    maybe<T, T2>(seed: T2, fn: (value: T) => T2, m: IMaybe<T>): T2;
    maybe<T, T2>(seed: T2, fn: (value: T) => T2): (m: IMaybe<T>) => T2;
    maybe<T, T2>(seed: T2): CurriedFunction2<(value: T) => T2, IMaybe<T>, T2>;
    of<T>(x: T): IMaybe<T>;
  }

  declare var Maybe: MaybeStatic;
}
