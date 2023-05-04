#[tauri::command]
pub async fn get_config() -> Result<(), String> {
    Ok(())
}
