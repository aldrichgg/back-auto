$urls = @(
    "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJyEgxzdGl0Y2hfZmlsZXMaYgosc3RpdGNoX2h0bWxfMDAwNjVjMDYzMWE4NWMxMjAyMDc5MTYxZjEzYjJkZjcSCxIHELzti6-OGRgBkgEkCgpwcm9qZWN0X2lkEhZCFDEzNzE0MDczOTAwMDQzNzgyOTA4&filename=&opi=89354086",
    "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJyEgxzdGl0Y2hfZmlsZXMaYgosc3RpdGNoX2h0bWxfMDAwNjVjMDYzMTE3NzUwYTA3M2FjMTJiOTEzOTY0NWISCxIHELzti6-OGRgBkgEkCgpwcm9qZWN0X2lkEhZCFDEzNzE0MDczOTAwMDQzNzgyOTA4&filename=&opi=89354086",
    "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJyEgxzdGl0Y2hfZmlsZXMaYgosc3RpdGNoX2h0bWxfMDAwNjVjMDYzMGNlMjRkMDA3YzRlNzM2YmQyNDUwNmMSCxIHELzti6-OGRgBkgEkCgpwcm9qZWN0X2lkEhZCFDEzNzE0MDczOTAwMDQzNzgyOTA4&filename=&opi=89354086",
    "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJyEgxzdGl0Y2hfZmlsZXMaYgosc3RpdGNoX2h0bWxfMDAwNjVjMDYzMTllMmU0YTA4OWFmNWFkNTcyNWQ1N2USCxIHELzti6-OGRgBkgEkCgpwcm9qZWN0X2lkEhZCFDEzNzE0MDczOTAwMDQzNzgyOTA4&filename=&opi=89354086",
    "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1YzA2NDE1MjgxOTEwNTc2MzFmYjFiMGUzMTNjEgsSBxC87YuvjhkYAZIBJAoKcHJvamVjdF9pZBIWQhQxMzcxNDA3MzkwMDA0Mzc4MjkwOA&filename=&opi=89354086",
    "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1YzA2NDExY2JkZDgwNzc5OWQwN2Q5MTk2NTRkEgsSBxC87YuvjhkYAZIBJAoKcHJvamVjdF9pZBIWQhQxMzcxNDA3MzkwMDA0Mzc4MjkwOA&filename=&opi=89354086",
    "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1YzA2NDE0MGIwMTcwNTNiNzY2ZWJmMDQ0NGFlEgsSBxC87YuvjhkYAZIBJAoKcHJvamVjdF9pZBIWQhQxMzcxNDA3MzkwMDA0Mzc4MjkwOA&filename=&opi=89354086",
    "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1YzA2NDBlM2IwZTcwMjJkNDI0YjVhMGU4YWVmEgsSBxC87YuvjhkYAZIBJAoKcHJvamVjdF9pZBIWQhQxMzcxNDA3MzkwMDA0Mzc4MjkwOA&filename=&opi=89354086"
)

$names = @(
    "1-gestao-de-drops.html",
    "2-terminal-operacoes.html",
    "3-mesa-compliance.html",
    "4-custodia-fisica.html",
    "5-catalogo-carros.html",
    "6-gestao-usuarios.html",
    "7-painel-master-geral.html",
    "8-controle-lucros.html"
)

for ($i=0; $i -lt $urls.Length; $i++) {
    Write-Output "Downloading $($names[$i])"
    Invoke-WebRequest -Uri $urls[$i] -OutFile "f:\Sistema\autoequity\docs\admin-designs\$($names[$i])"
}
