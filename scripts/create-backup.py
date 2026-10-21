import os
import zipfile
from datetime import datetime

timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
backup_dir = "backups"
os.makedirs(backup_dir, exist_ok=True)
zip_filename = os.path.join(backup_dir, f"backup-{timestamp}-all-phases-complete.zip")

exclude_dirs = {"node_modules", ".next", "backups", ".git"}

print(f"Creating backup archive: {zip_filename} ...")

file_count = 0
total_uncompressed_bytes = 0

with zipfile.ZipFile(zip_filename, "w", zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk("."):
        # Prune excluded directories
        dirs[:] = [d for d in dirs if d not in exclude_dirs]
        for file in files:
            file_path = os.path.join(root, file)
            # Normalize archive path
            rel_path = os.path.relpath(file_path, ".")
            zipf.write(file_path, rel_path)
            file_count += 1
            total_uncompressed_bytes += os.path.getsize(file_path)

zip_size_mb = os.path.getsize(zip_filename) / (1024 * 1024)
uncompressed_mb = total_uncompressed_bytes / (1024 * 1024)

print("Backup completed successfully!")
print(f"  Archive path: {os.path.abspath(zip_filename)}")
print(f"  Files backed up: {file_count}")
print(f"  Uncompressed size: {uncompressed_mb:.2f} MB")
print(f"  Archive size: {zip_size_mb:.2f} MB")
