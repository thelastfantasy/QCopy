#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("看啊, {}! 一个Rust程序就是如此简单😊", name)
}

#[tauri::command]
fn sky() -> String {
    String::from("🛫 芜湖，起飞！💺")
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, sky])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    // let app = tauri::Builder::default().build(tauri::generate_context!("test/fixture/src-tauri/tauri.conf.json")).unwrap();
}
