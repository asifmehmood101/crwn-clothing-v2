import { AnyAction } from 'redux';
// type Alien = {
//   fly: () => {};
// };

// type Human = {
//   speak: () => {};
// };

// // its a type predicate
// const isHuman = (entity: Human | Alien): entity is Human => {
//   return (entity as Human) !== undefined;
// };

// const josn

// if (isHuman(josn)) {
//   josn.speak()
// }

// intersection types

// type Alien = {
//   fly: () => {};
// };

// type Human = {
//   name: string;
// };

// type Hybrid = Alien & Human;

// const Ali: Hybrid = {
//   name: 'ali',
//   fly: () => {},
// };

// function return type

// type Myfunc = () => string;

// type returnType = ReturnType<Myfunc>;

// matchable type
type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>['type'];
  match(action: AnyAction): action is ReturnType<AC>;
};

// matcher with no args
export function withMatcher<AC extends () => AnyAction & { type: string }>(
  actionCreator: AC,
): Matchable<AC>;

// matcher with args
export function withMatcher<
  AC extends (...args: any[]) => AnyAction & { type: string },
>(actionCreator: AC): Matchable<AC>;

export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type;

  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    },
  });
}

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};

// createAction overloads
export function createAction<T extends string, P>(
  type: T,
  payload: P,
): ActionWithPayload<T, P>;

export function createAction<T extends string>(
  type: T,
  payload: void,
): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}
