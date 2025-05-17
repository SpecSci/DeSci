// Combined DESPEC Token + Spectro Data Canister
// NOTE: This is a truncated placeholder implementation for demo purposes.

use ic_cdk::api::{caller, time};
use ic_cdk::storage;
use ic_cdk_macros::{init, pre_upgrade, post_upgrade, query, update};
use candid::{CandidType, Deserialize, Nat, Principal};
use serde::Serialize;
use std::cell::RefCell;
use std::collections::{BTreeMap, HashMap, HashSet};

#[derive(Clone, CandidType, Deserialize)]
pub struct SpectroAgent {
    pub principal: Principal,
    pub trust_score: i32,
    pub registered_at: u64,
}

#[derive(Clone, CandidType, Deserialize)]
pub struct SpectroData {
    pub id: u64,
    pub submitter: Principal,
    pub created_at: u64,
    pub trust_score: i32,
    pub metadata: BTreeMap<String, String>,
    pub upvotes: HashSet<Principal>,
    pub downvotes: HashSet<Principal>,
}

#[derive(Clone, CandidType, Deserialize, Default, Serialize)]
pub struct SpectroState {
    pub oracle: Principal,
    pub agents: HashMap<Principal, SpectroAgent>,
    pub data: HashMap<u64, SpectroData>,
    pub next_data_id: u64,
}

#[derive(CandidType, Deserialize, Serialize, Clone)]
pub struct GlobalState {
    pub spectro: SpectroState,
}

thread_local! {
    static STATE: RefCell<GlobalState> = RefCell::new(GlobalState { spectro: SpectroState::default() });
}

fn with_state<F, R>(f: F) -> R
where
    F: FnOnce(&GlobalState) -> R,
{
    STATE.with(|s| f(&s.borrow()))
}

fn with_mut_state<F, R>(f: F) -> R
where
    F: FnOnce(&mut GlobalState) -> R,
{
    STATE.with(|s| f(&mut s.borrow_mut()))
}

#[init]
fn init() {
    with_mut_state(|state| {
        state.spectro.oracle = caller();
    });
}

#[pre_upgrade]
fn pre_upgrade() {
    with_state(|state| {
        storage::stable_save((state.clone(),)).unwrap();
    });
}

#[post_upgrade]
fn post_upgrade() {
    let (st,): (GlobalState,) = storage::stable_restore().unwrap();
    STATE.with(|s| *s.borrow_mut() = st);
}

#[update]
pub fn register_agent() -> Result<(), String> {
    let principal = caller();
    with_mut_state(|state| {
        if state.spectro.agents.contains_key(&principal) {
            return Err("Already registered".to_string());
        }
        state.spectro.agents.insert(principal, SpectroAgent {
            principal,
            trust_score: 0,
            registered_at: time(),
        });
        Ok(())
    })
}

#[query]
pub fn get_agent(p: Principal) -> Option<SpectroAgent> {
    with_state(|state| state.spectro.agents.get(&p).cloned())
}

// TODO: implement full token ledger and remaining canister logic
