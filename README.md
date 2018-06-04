# Autocompletion for crates in cargo.toml

You can just start typing a crate's name and this package will search for it,
including the crate's newest version and description.

## Known Issue

Because this package uses the api of creates.io it can happen that you type a crate's name, see a bunch of crates, continue typing and suddenly all are gone, the crate you were searching still missing.
The same thing happens when you search directly on crates.io, so just type the crate's name out and you will get at least version completion.
For example searching for `conrod`, you wil see lots of other crates until you typed `conr`, then you wont see anything until it's fully written out.
