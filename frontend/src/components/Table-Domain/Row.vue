<template>
    <tr>
        <td><input class="form-check-input m-0 align-middle" type="checkbox" aria-label="Select domain"></td>
        <td><span class="text-muted">001401</span></td>
        <td><a href="invoice.html" class="text-reset" tabindex="-1">Design Works</a></td>
        <td>
            <span class="flag flag-country-us"></span>
            Carlson Limited
        </td>
        <td>
            87956621
        </td>
        <td>
            15 Dec 2017
        </td>
        <td>
            <span class="badge bg-success me-1"></span> Paid
        </td>
        <td>$887</td>
        <td class="text-end">
            <span class="dropdown">
                <button class="btn dropdown-toggle align-text-top" data-bs-boundary="viewport"
                    data-bs-toggle="dropdown">Actions</button>
                <div class="dropdown-menu dropdown-menu-end">
                    <a class="dropdown-item" href="#">
                        Action
                    </a>
                    <a class="dropdown-item" href="#">
                        Another action
                    </a>
                </div>
            </span>
        </td>
    </tr>
</template>


<script>
export default {
    name: 'Table-Row',
    props: {
        row: Object
    }
}
</script>