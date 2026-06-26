#!/usr/bin/env python3
import shutil, os

src1 = '/root/.claude/uploads/7f0f5c8d-31d5-570b-9dde-8ace007fd29f/b80c7a1d-Fire_To_Flavor_1.mp4'
src2 = '/root/.claude/uploads/7f0f5c8d-31d5-570b-9dde-8ace007fd29f/ae8c4d0f-Fire_To_Flavor_2.mp4'
dst_dir = '/home/user/yash/videos'

os.makedirs(dst_dir, exist_ok=True)

shutil.copy2(src1, os.path.join(dst_dir, 'fire-to-flavor-1.mp4'))
shutil.copy2(src2, os.path.join(dst_dir, 'fire-to-flavor-2.mp4'))

for f in os.listdir(dst_dir):
    size = os.path.getsize(os.path.join(dst_dir, f))
    print(f'{f}: {size // 1024} KB')

print('Done.')
