// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{window, Window};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn is_fullscreen(window: Window) -> bool {
    window.is_fullscreen().unwrap_or(false)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![is_fullscreen, greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
