
# install rust lang
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# update to nightly
rustup -v install  nightly

# install rust package
cargo +nightly install hvm
cargo +nightly install bend-lang

# next
read EXAMPLES.md